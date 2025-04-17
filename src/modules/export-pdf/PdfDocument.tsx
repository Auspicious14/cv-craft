import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
});

export const PdfDocument = ({
  personalInfo,
  academics,
  experience,
  skills,
}: {
  personalInfo: any;
  academics: any[];
  experience: any[];
  skills: any[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Personal Information</Text>
        <Text style={styles.text}>Name: {personalInfo?.name}</Text>
        <Text style={styles.text}>Email: {personalInfo?.email}</Text>
        <Text style={styles.text}>Phone: {personalInfo?.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Academics</Text>
        {academics?.map((academy, index) => (
          <Text key={index} style={styles.text}>
            {academy.degree} at {academy.institution} ({academy.year})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        {experience?.map((exp, index) => (
          <Text key={index} style={styles.text}>
            {exp.position} at {exp.company} ({exp.duration})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Skills</Text>
        {skills?.map((skill, index) => (
          <Text key={index} style={styles.text}>
            {skill.name} - {skill.level}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
