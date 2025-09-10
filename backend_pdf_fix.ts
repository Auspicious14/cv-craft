// The user provided this helper, so I'll assume it's set up correctly.
hbs.registerHelper("dateFormat", (date: string, formatStr: string) =>
  format(new Date(date), formatStr)
);

// Unmodified function
export const getCV = async (req: Request, res: Response) => {
  const { cvId } = req.params;
  const userId = (req as any).user?._id;
  const id = userId || cvId;

  try {
    const cv = await CVModel.findOne({ _id: id }).select("-__v -_id -userId");
    if (!cv) return res.json({ success: false, message: "CV not found" });

    res.json({
      success: true,
      data: {
        personalInformation: cv.personalInformation,
        academic: cv.academic,
        certificate: cv.certificate,
        experience: cv.experience,
        skill: cv.skill,
        language: cv.language,
      },
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ success: false, errors });
  }
};

// Modified function
export const generatePDF = async (req: Request, res: Response) => {
  const { cvId, template } = req.body;
  console.log("Generating PDF for cvId:", cvId, "with template:", template);
  console.log("Request body: ", req.body);

  let browser;
  try {
    const cv = await CVModel.findById(cvId);
    if (!cv) {
      return res.status(404).json({ success: false, message: "CV not found" });
    }

    const templatePath = path.join(
      __dirname,
      `../../src/templates/${template.toLowerCase()}.html`
    );

    console.log("Attempting to read template from:", templatePath);

    if (!fs.existsSync(templatePath)) {
      console.error("Template not found at path:", templatePath);
      return res
        .status(400)
        .json({ success: false, message: "Invalid template provided." });
    }

    const html = fs.readFileSync(templatePath, "utf-8");
    const templateRender = hbs.compile(html);
    const finalHTML = templateRender(cv.toObject());

    console.log("Launching Puppeteer...");
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    console.log("Setting page content...");
    await page.setContent(finalHTML, { waitUntil: "networkidle0" });

    console.log("Generating PDF buffer...");
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    console.log("Closing browser...");
    await browser.close();
    browser = null; // Ensure browser is null after closing

    console.log("PDF generated successfully. Sending response...");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(
        cv.personalInformation?.firstName || "cv"
      )}.pdf"`
    );

    res.end(pdfBuffer);
  } catch (error: any) {
    console.error("--- PDF Generation Failed ---");
    console.error("Timestamp:", new Date().toISOString());
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    console.error("Full Error Object:", JSON.stringify(error, null, 2));

    if (browser) {
      console.log("Closing browser due to error...");
      await browser.close();
    }

    const errors = handleErrors(error);
    // Providing a more structured error response for the frontend
    res.status(500).json({
        success: false,
        message: "An error occurred during PDF generation. Please check server logs.",
        errors
    });
  }
};


// Unmodified function
export const getGuestCVSections = async (req: Request, res: Response) => {
  const { cvId } = req.params;

  try {
    const cv = await CVModel.findById(cvId).select("-__v -_id -userId");
    if (!cv?.isGuestCV)
      return res.json({ success: false, message: "Guest CV not found" });

    res.json({
      success: true,
      data: {
        personalInformation: cv.personalInformation,
        academic: cv.academic,
        certificate: cv.certificate,
        experience: cv.experience,
        skill: cv.skill,
      },
    });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ success: false, errors });
  }
};
```
This is not right. I should not create a file with the code. The user provided the code. I should provide the modified code back to the user.
The plan says: "I will provide you with the updated backend code to replace the existing function."

So, I should message the user with the code.
But the prompt says "Once you have finished this, call `plan_step_complete()`".

I will message the user with the code, and then I will call `plan_step_complete`. This seems to be the right way to proceed.

I will message the user and provide the updated code for the `generatePDF` function. I will explain the changes I made and why.

The message should be clear and concise.

```
I have updated the `generatePDF` function to make it more robust and to help us diagnose the root cause of the PDF generation error. Here is the updated code for the entire file. Please replace the content of the corresponding file in your backend codebase with this new code.

Key changes:
1.  **Added Puppeteer launch arguments:** I've included `--no-sandbox` and `--disable-setuid-sandbox` which are common flags needed to run Puppeteer in many server environments. This is the most likely fix for the problem.
2.  **Improved Error Logging:** I've added detailed logging in the `catch` block. If the error persists, the logs on your backend server will now contain much more specific information (like the error message and stack trace), which will help us find the exact problem.
3.  **Robustness:** I've added logic to ensure the Puppeteer browser instance is closed even if an error occurs, and I've added a `waitUntil: 'networkidle0'` option to better handle rendering pages with network activity.

<the code here>

After you've updated the backend, please try generating a PDF again. If it still fails, please check your backend server's logs and share any new error messages with me.
```

This seems like a good message. I'll put the code inside the message.
The problem is that I can't put a code block inside `message_user`. The `message_user` tool takes a string.

I will create the file `backend_pdf_fix.ts` in the root of the project, and then message the user to check that file. This is the best way to deliver the code.

Ok, I'll proceed with creating the file.
