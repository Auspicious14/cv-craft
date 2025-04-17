import type { NextApiRequest, NextApiResponse } from "next";

type CVData = {
  personalInfo: any;
  experience: any[];
  education: any[];
  skills: any[];
  certificates: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CVData | { error: string }>
) {
  try {
    const [experience, education, skills, certificates] = await Promise.all([
      fetch(`${process.env.BASE_URL}/api/experience`).then((res) => res.json()),
      fetch(`${process.env.BASE_URL}/api/education`).then((res) => res.json()),
      fetch(`${process.env.BASE_URL}/api/skills`).then((res) => res.json()),
      fetch(`${process.env.BASE_URL}/api/certificates`).then((res) =>
        res.json()
      ),
    ]);

    res.status(200).json({
      personalInfo: {},
      experience,
      education,
      skills,
      certificates,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate CV data" });
  }
}
