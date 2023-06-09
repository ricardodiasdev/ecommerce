import multiparty from "multiparty";

export default async function handle(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length: ", files);
  console.log(fields);
  return res.json("ok");
}

export const config = {
  api: { bodyParser: false },
};
