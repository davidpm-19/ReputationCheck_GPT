'use client';

import { useAssistant, Message } from 'ai/react';
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BsInfoSquare } from "react-icons/bs";
import { SiTorbrowser, SiOpenvpn } from "react-icons/si";
import { FaRobot } from "react-icons/fa6";

import {
  Bar,
  BarChart,
  LabelList,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
} from "@/components/ui/chart"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange } = useAssistant({ api: '/api/assistant' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitMessage();
  };

  const handleInputChangeWithValidation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  return (
    <div className='flex justify-center items-center p-32'>
      <div className="flex flex-col w-full stretch">
        <form onSubmit={handleSubmit} className="top-0 w-full p-2 mb-8 border border-gray-300 rounded shadow-xl bg-white flex justify-between">
          <Input
            value={input}
            placeholder="Enter an IP address..."
            onChange={handleInputChangeWithValidation}
            disabled={status !== 'awaiting_message'}
            className="w-[95%] p-2 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0" />
          <Button
            type="submit"
            disabled={status !== 'awaiting_message'}
            className="bg-black text-white hover:bg-gray-800 hover:scale-110 transition-all duration-500 rounded">
            Analyze
          </Button>
        </form>
        {messages.slice().reverse().map((m: Message) => (
          <div
            key={m.id}
            className="whitespace-pre-wrap w-full"
          >
            {m.role === 'data' && (
              <>
                <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
                  <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[20rem]">
                    <Card
                      className="max-w-xs" x-chunk="charts-01-chunk-5"
                    >
                      <CardTitle className="flex gap-4 px-4 pt-4 text-xl">Security vendors' reports</CardTitle>
                      <CardDescription className="flex gap-4 px-4 pt-2">
                        
                      </CardDescription>
                      <CardContent className="flex gap-4 p-4">
                        <div className="grid items-center gap-2">
                          <div className="grid flex-1 auto-rows-min gap-0.5">
                            <div className="text-sm text-black font-light">Harmless</div>
                            <div className="flex items-baseline gap-1 text-xl tabular-nums leading-none text-[#4CB140] font-black">
                              {m.data?.vtReport.data.attributes.last_analysis_stats.harmless}
                            </div>
                          </div>
                          <div className="grid flex-1 auto-rows-min gap-0.5">
                            <div className="text-sm text-black font-light">Suspicious</div>
                            <div className="flex items-baseline gap-1 text-xl tabular-nums leading-none text-[#EF9234] font-black">
                              {m.data.vtReport.data.attributes.last_analysis_stats.suspicious}
                            </div>
                          </div>
                          <div className="grid flex-1 auto-rows-min gap-0.5">
                            <div className="text-sm text-black font-light">Malicious</div>
                            <div className="flex items-baseline gap-1 text-xl tabular-nums leading-none text-[#C9190B] font-black">
                              {m.data?.vtReport.data.attributes.last_analysis_stats.malicious}
                            </div>
                          </div>
                          <div className="grid flex-1 auto-rows-min gap-0.5">
                            <div className="text-sm text-black font-light">Undetected</div>
                            <div className="flex items-baseline gap-1 text-xl tabular-nums leading-none text-[#06C] font-black">
                              {m.data.vtReport.data.attributes.last_analysis_stats.undetected}
                            </div>
                          </div>
                        </div>
                        <ChartContainer
                          config={{
                            malicious: {
                              label: "Malicious",
                              color: "#C9190B",
                            },
                            suspicious: {
                              label: "Suspicious",
                              color: "#EF9234",
                            },
                            harmless: {
                              label: "Harmless",
                              color: "#4CB140",
                            },
                            undetected: {
                              label: "Undetected",
                              color: "#06C",
                            },
                          }}
                          className="mx-auto aspect-square w-full max-w-[80%]"
                        >
                          <RadialBarChart
                            margin={{
                              left: -10,
                              right: -10,
                              top: -10,
                              bottom: -10,
                            }}
                            data={[
                              {
                                activity: "harmless",
                                value: m.data.vtReport.data.attributes.last_analysis_stats.harmless == 0 ? 0 : (m.data.vtReport.data.attributes.last_analysis_stats.harmless / (m.data.vtReport.data.attributes.last_analysis_stats.malicious + m.data.vtReport.data.attributes.last_analysis_stats.suspicious + m.data.vtReport.data.attributes.last_analysis_stats.harmless + m.data.vtReport.data.attributes.last_analysis_stats.undetected)) * 100,
                                fill: "var(--color-harmless)",
                              },
                              {
                                activity: "suspicious",
                                value: m.data.vtReport.data.attributes.last_analysis_stats.suspicious == 0 ? 0 : (m.data.vtReport.data.attributes.last_analysis_stats.suspicious / (m.data.vtReport.data.attributes.last_analysis_stats.malicious + m.data.vtReport.data.attributes.last_analysis_stats.suspicious + m.data.vtReport.data.attributes.last_analysis_stats.harmless + m.data.vtReport.data.attributes.last_analysis_stats.undetected)) * 100,
                                fill: "var(--color-suspicious)",
                              },
                              {
                                activity: "malicious",
                                value: m.data.vtReport.data.attributes.last_analysis_stats.malicious == 0 ? 0 : (m.data.vtReport.data.attributes.last_analysis_stats.malicious / (m.data.vtReport.data.attributes.last_analysis_stats.malicious + m.data.vtReport.data.attributes.last_analysis_stats.suspicious + m.data.vtReport.data.attributes.last_analysis_stats.harmless + m.data.vtReport.data.attributes.last_analysis_stats.undetected)) * 100,
                                fill: "var(--color-malicious)",
                              },
                              {
                                activity: "undetected",
                                value: m.data.vtReport.data.attributes.last_analysis_stats.undetected == 0 ? 0 : (m.data.vtReport.data.attributes.last_analysis_stats.undetected / (m.data.vtReport.data.attributes.last_analysis_stats.malicious + m.data.vtReport.data.attributes.last_analysis_stats.suspicious + m.data.vtReport.data.attributes.last_analysis_stats.harmless + m.data.vtReport.data.attributes.last_analysis_stats.undetected)) * 100,
                                fill: "var(--color-undetected)",
                              },
                            ]}
                            innerRadius="20%"
                            barSize={24}
                            startAngle={90}
                            endAngle={450}
                          >
                            <PolarAngleAxis
                              type="number"
                              domain={[0, 100]}
                              dataKey="value"
                              tick={false}
                            />
                            <RadialBar dataKey="value" background cornerRadius={15} />
                          </RadialBarChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>
                    <Card
                      className="max-w-xs" x-chunk="charts-01-chunk-2"
                    >
                      <CardHeader>
                        <CardTitle className='text-xl'>Tags</CardTitle>
                        <CardDescription>
                          Hover <Badge className='bg-black text-white m-1 text-xs'>tags</Badge> to see more details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className=" grid-flow-row gap-1">
                        {m.data.gnReport.tags && m.data.gnReport.tags.map((tag, index) => {
                          const tagSummary = m.data.tagSummaries.find(summary => summary.tag === tag);
                          return (
                            <HoverCard key={index}>
                              <HoverCardTrigger className='hover:cursor-pointer'><Badge className='bg-black text-white m-1'>{tag}</Badge></HoverCardTrigger>
                              <HoverCardContent className='bg-white hcc' sideOffset={15}>
                                <p>{tagSummary?.summary.content || "No summary available"}</p>
                              </HoverCardContent>
                            </HoverCard>
                          )
                        })}
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                    <Card
                      className="max-w-xs" x-chunk="charts-01-chunk-2"
                    >
                      <CardHeader>
                        <CardTitle className='text-xl'>Malicious Score</CardTitle>
                        <CardDescription>
                          Hover info to see justification
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="grid auto-rows-min gap-2">
                          <div className={`flex items-center gap-1 text-2xl font-bold tabular-nums leading-none ${m.data.confidenceScore.split("_")[0] == 1.0 ? `text-[#C9190B]` : m.data.confidenceScore.split("_")[0] == 0.0 ? `text-[#4CB140]` : `text-[#EF9234]`}`}>

                            <ChartContainer
                              config={{
                                indicator: {
                                  label: "indicator",
                                  color: m.data.confidenceScore.split("_")[0] == 1.0 ? `#C9190B` : m.data.confidenceScore.split("_")[0] == 0.0 ? `#4CB140` : `#EF9234`,
                                },
                              }}
                              className="aspect-auto h-[32px] w-full"
                            >
                              <BarChart
                                accessibilityLayer
                                layout="vertical"
                                margin={{
                                  left: 0,
                                  top: 0,
                                  right: 0,
                                  bottom: 0,
                                }}
                                data={[
                                  {
                                    date: m.data.confidenceScore.split("_")[0],
                                    indicator: m.data.confidenceScore.split("_")[0] == 0.0 ? 1 : m.data.confidenceScore.split("_")[0],
                                  },
                                ]}
                              >
                                <Bar
                                  dataKey="indicator"
                                  fill="var(--color-indicator)"
                                  radius={4}
                                  barSize={32}
                                >
                                  <LabelList
                                    position="insideLeft"
                                    dataKey="date"
                                    offset={8}
                                    fontSize={12}
                                    fill="white"
                                  />
                                </Bar>
                                <YAxis dataKey="date" type="category" tickCount={1} hide />
                                <XAxis dataKey="indicator" type="number" hide />
                              </BarChart>
                            </ChartContainer>
                            <HoverCard>
                              <HoverCardTrigger className='hover:cursor-pointer'><BsInfoSquare className='text-black text-2xl' /></HoverCardTrigger>
                              <HoverCardContent className='bg-white hcc w-[90%]' sideOffset={15}>
                                <p className='text-wrap text-lg'>{m.data.confidenceScore.split("_")[1]}</p>
                              </HoverCardContent>
                            </HoverCard>

                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="max-w-xs" x-chunk="charts-01-chunk-2"
                    >
                      <CardHeader>
                        <CardTitle className ='text-xl'>Want to know more?</CardTitle>
                        <CardDescription>
                          Take a look at the full reports
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="grid auto-rows-min gap-2">
                          <div className={`flex flex-col items-start gap-2 text-xl font-normal tabular-nums leading-none`}>
                            <Link target='_blank' href={`https://www.virustotal.com/gui/ip-address/${m.data.vtReport.data.id}`} className='border-[#06C] border-b-2 hover:font-bold transition-all duration-500'>Check Virustotal Report</Link>
                            <Link target='_blank' href={`https://viz.greynoise.io/ip/${m.data.vtReport.data.id}`} className='border-[#06C] border-b-2 hover:font-bold transition-all duration-500'>Check Greynoise Report</Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
                    <Card
                      className="max-w-xs" x-chunk="charts-01-chunk-2"
                    >
                      <CardHeader>
                        <CardTitle>Quick Analysis</CardTitle>
                        <CardDescription>
                          Results from the quick analysis of {m.data.gnSupReport.ip}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Noise</TableHead>
                              <TableHead>RIOT</TableHead>
                              <TableHead>Code</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>{m.data.gnSupReport.noise ? "yes" : "no"}</TableCell>
                              <TableCell>{m.data.gnSupReport.riot ? "yes" : "no"}</TableCell>
                              <TableCell>{m.data.gnSupReport.code}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                    <Card
                      className="max-w-xs" x-chunk="charts-01-chunk-2"
                    >
                      <CardHeader>
                        <CardTitle>TOR, BOT or VPN?</CardTitle>
                        <CardDescription>
                          Tor Node, VPN or BOT identification
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-1">
                        <div className="grid auto-rows-min gap-2">
                          <div className={`flex flex-col items-start gap-2 text-xl font-normal tabular-nums leading-none`}>
                            {m.data.gnReport.metadata && m.data.gnReport.metadata.tor && (<div className='text-wrap flex items-center text-sm'>{<SiTorbrowser className={`text-xl text-[#4CB140]`}/>} IP recognized as a tor exit node</div>) || (<div className='text-wrap flex items-center text-sm'><SiTorbrowser className={`text-xl text-[#807c7c]`}/> IP recognized as a TOR exit node</div>)}
                            <div className='text-wrap flex items-center text-sm'>{<SiOpenvpn className={`text-xl ${m.data.gnReport.vpn ? `text-[#4CB140]` : `text-[#807c7c]`}`}/>} IP {m.data.gnReport.vpn ? "using" : "not using"} a VPN</div>
                            <div className='text-wrap flex items-center text-sm'>{<FaRobot className={`text-xl ${m.data.gnReport.bot ? `text-[#4CB140]` : `text-[#807c7c]`}`}/>} IP {m.data.gnReport.bot ? "recognized" : "not recognized"} as BOT</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
            <br />
            <br />
          </div>
        ))}

      </div>
    </div>
  );
}
