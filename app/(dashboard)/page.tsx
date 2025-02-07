"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

export default function HomePage() {
  return (
    <div className="text-center">
      <div className="bg-[url(/walton.png)] h-[600px] bg-no-repeat bg-center bg-cover bg-fixed backdrop-brightness-200">
        <div className="h-full flex justify-center items-center bg-sky-950/30">
          <p className="text-white text-8xl font-semibold">
            Walton Find
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-auto mx-4">
          <p className="text-black text-6xl my-16 font-semibold">Find Jobs with Reputable Employers</p>
        </div>
        <hr className="my-4 max-w-screen-xl mx-auto mb-16"/>
        <div className="flex flex-col justify-center items-center m-auto mx-4">
          <p className="text-3xl font-semibold mb-6">Why Us?</p>
          <p className="overflow-auto text-wrap max-w-screen-md text-center italic">
            A school-approved job connection website streamlines the process of linking students with verified employers,
            ensuring safe and relevant work opportunities. By providing a platform where students can explore part-time jobs,
            internships, and volunteer positions that align with their school’s guidelines, the website simplifies job searching
            while maintaining compliance with educational policies. Employers can easily post openings, verify their school approval
            status, and connect with motivated students looking for career-building experiences. Additionally, students can filter
            job listings based on location, industry, and required skills, making it easier to find positions that match their
            interests and availability. This platform fosters a productive relationship between schools, students, and businesses,
            promoting career readiness and professional development.
          </p>
        </div>
        <hr className="max-w-screen-xl mx-auto my-16"/>
        <div className="flex flex-col justify-center items-center m-auto mx-4">
          <p className="text-3xl font-semibold mb-6">Student and Company Testimonials</p>
          <div>
          <Carousel 
            className="mx-12 mb-16 max-w-xl"
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem>
                <Card>
                  <CardHeader>
                    <CardTitle>Student</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">Walton Find has allowed me graduate with real world work experience!</p>
                  </CardContent>
                  <CardFooter>
                    <p>Vipul Bansal - Class of 2018</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem>
              <Card>
                  <CardHeader>
                    <CardTitle>Student</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">I was able to gain industrial level jobs and apply real world applications from school!</p>
                  </CardContent>
                  <CardFooter>
                    <p>Matthew Zhu - Class of 2019</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardHeader>
                    <CardTitle>Company</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">We were able to find the most passionate and skilled students through Walton Find!</p>
                  </CardContent>
                  <CardFooter>
                    <p>Apple</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          </div>
        </div>
    </div>
  );
}
