import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default function CVTemplate({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{data.personalInfo?.name}</Text>
          <Text>{data.personalInfo?.email}</Text>
          <Text>{data.personalInfo?.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Professional Summary</Text>
          <Text>{data.personalInfo?.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Work Experience</Text>
          {data.experience?.map((exp: any, index: number) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "semibold" }}>{exp.jobTitle}</Text>
              <Text>{exp.company}</Text>
              <Text>
                {exp.startDate} - {exp.endDate}
              </Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Certifications</Text>
        </View>
      </Page>
    </Document>
  );
}
