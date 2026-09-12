import { sheetTitle } from "./integration-config";
import "server-only";
import { GoogleAuth } from "google-auth-library";
const capacity = new Map<string, number>();
const auth = () =>
  new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
export async function writeSheetRow(
  formType: string,
  row: number,
  values: string[],
) {
  const title = sheetTitle(formType);
  const client = await auth().getClient();
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}`;
  if (row > (capacity.get(formType) || 0)) {
    const result = await client.request<{
      sheets: {
        properties: {
          title: string;
          sheetId: number;
          gridProperties: { rowCount: number };
        };
      }[];
    }>({
      url: base + "?fields=sheets.properties",
      timeout: 15000,
    });
    const sheet = result.data.sheets.find(
      (sheet) => sheet.properties.title === title,
    )?.properties;
    if (!sheet) throw new Error("Submission sheet has not been initialized");
    if (row > sheet.gridProperties.rowCount) {
      const length = Math.max(1000, row - sheet.gridProperties.rowCount);
      await client.request({
        url: base + ":batchUpdate",
        method: "POST",
        data: {
          requests: [
            {
              appendDimension: {
                sheetId: sheet.sheetId,
                dimension: "ROWS",
                length,
              },
            },
          ],
        },
        timeout: 15000,
      });
      capacity.set(formType, sheet.gridProperties.rowCount + length);
    } else capacity.set(formType, sheet.gridProperties.rowCount);
  }
  const range = encodeURIComponent(
    `'${title.replaceAll("'", "''")}'!A${row}:F${row}`,
  );
  await client.request({
    url: `${base}/values/${range}?valueInputOption=RAW`,
    method: "PUT",
    data: { values: [values] },
    timeout: 15000,
  });
}
