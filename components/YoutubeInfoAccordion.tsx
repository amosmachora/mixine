import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function YoutubeInfoAccordion({
  savedYoutubeInfo,
}: {
  savedYoutubeInfo: any;
}) {
  return (
    <Accordion type="single" collapsible className="w-full md:hidden">
      <AccordionItem value="item-1">
        <AccordionTrigger>More Info</AccordionTrigger>
        <AccordionContent>
          <p className="show mt-5 font-semibold">{savedYoutubeInfo?.title}</p>
          <p className="show font-medium mt-6">
            {savedYoutubeInfo?.channelTitle}
          </p>
          <p className="show bg-gray-100 rounded p-2 text-sm">
            {savedYoutubeInfo?.description}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
