'use client';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from '@/components/ui/card';


export default function About() {

    return (
        <div className="chart-wrapper mx-auto max-w-6xl flex-col flex-wrapgap-6 sm:flex-row sm:p-8 flex justify-center items-center p-32">
            <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
                <Card
                    className="lg:max-w-md" x-chunk="charts-01-chunk-0"
                >
                    <CardContent>
                        <div className=''>
                            <div className="flex flex-col w-full stretch border-">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>What is RepCheck?</AccordionTrigger>
                                        <AccordionContent className="AccordionContent">
                                            RepCheck is a GPT4 powered IP Reputation Checker extracting information from multiple sources and using AI to determine a risk level.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Does it use Vercel AI SDK?</AccordionTrigger>
                                        <AccordionContent className="AccordionContent">
                                            Yes. It uses the assistant API from Vercel AI SDK to simplify the process of making requests allowing user to type human sentences instead of just an IP, it also uses completion to call models and provide information about some elements and calculate the risk score.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Is it complete?</AccordionTrigger>
                                        <AccordionContent className="AccordionContent">
                                            No. The idea is to expand RepCheck for URLs, Mails and files/hashes, that's why the assistant is perfect as it will automatically trigger functions based on the user input, also important to point that it requires more training to improve the accuracy so it's important to check the reports if having doubts about the results.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>How does it work?</AccordionTrigger>
                                        <AccordionContent className="AccordionContent">
                                            RepCheck has an specific OpenAI Assistant with access to Virustotal and Greynoise APIs (for now)
                                            <br />
                                            With the information of the reports it calls a model to analyze certain elements and determine a risk score and some brief description for tags or justifications
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}
