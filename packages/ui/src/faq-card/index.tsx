import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

interface FaqCardProps {
  title: ReactNode;
  questions: Array<{
    question: ReactNode;
    answer: ReactNode;
  }>;
}

export const FaqCard = ({ title, questions }: FaqCardProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {questions.map(({ question, answer }, index) => (
          <Accordion key={`faq-${index}`} variant="outlined" style={{ marginTop: -1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="body1">{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>{answer}</AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};
