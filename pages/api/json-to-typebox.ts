import { NextApiRequest, NextApiResponse } from "next";
import { schema2typebox } from "schema2typebox";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { value, rootName } = req.body;

    const { run } = await import("json_typegen_wasm");

    const jsonSchema = run(
      "Root",
      value,
      JSON.stringify({
        output_mode: "json_schema"
      })
    );

    console.log("Value", jsonSchema);

    const schema = JSON.parse(jsonSchema);

    schema.title = rootName;

    const typebox = await schema2typebox({ input: JSON.stringify(schema) });

    res.status(200).send(typebox);
  } catch (e) {
    console.log("Error", e);
    res.status(500).send(e.message);
  }
};
