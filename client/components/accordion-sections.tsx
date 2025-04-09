import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FileText } from "lucide-react";

const AccordionSections = ({ sections }: AccordionSectionsProps) => {
  return (
    <Accordion type="multiple" className="w-full">
      {sections.map((section, index) => (
        <AccordionItem
          key={index}
          value={section.sectionTitle}
          className="accordion-section"
        >
          <AccordionTrigger className="accordion-section__trigger">
            <h5 className="accordion-section__title">{section.sectionTitle}</h5>
          </AccordionTrigger>
          <AccordionContent className="accordion-section__content">
            <ul className="flex flex-col gap-2">
              {section.chapters.map((chapter, index) => (
                <li key={index} className="accordion-section__chapter">
                  <FileText className="mr-2 w-4 h-4" />
                  <span className="text-sm">{chapter.title}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionSections;
