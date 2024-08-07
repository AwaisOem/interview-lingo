import { SignedIn } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { BriefcaseIcon, GlobeAltIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";


export default function Home() {
  return (<>
  
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Checkout Demo on our Linkedin.{' '}
              <a href="#" className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                Demo <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-in slide-in-from-top-7 delay-300 duration-1000 lg:text-center text-left">
            Revolutionize Your Hiring Process with AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-in slide-in-from-bottom-7 delay-300 duration-1000 lg:text-center text-left">
            Transform the way you conduct interviews with our advanced AI-powered system. Experience seamless multilingual support, real-time feedback, and in-depth analysis to hire the best talent efficiently.
            </p>
            <div className="mt-10 flex items-center lg:justify-center justify-start gap-x-6">
              <SignedOut>
                <Link
                  href="/sign-up"
                  >
                  <span
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                  Get started
                  </span>
                </Link>
              </SignedOut>
              <SignedIn>
              <Link
                  href="/dashboard"
                  >
                  <span
                    className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                  Dashboard
                  </span>
                </Link>
              </SignedIn>
              <Link href="mailto:awaisoem@gmail.com">
                <span className="text-sm font-semibold leading-6 text-gray-900">
                  Contact Us <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
          <VideoPlayer />
          <FeaturesSection />
          <TargetAudienceSection />
          <GoalsSection />
          <div className="w-fit p-5  flex flex-col absolute lg:top-56 gap-2 rounded-md animate-in slideInFromLeft delay-1000 duration-1000 " id="demo-div">
                <h3 className="font-semibold">For testing purposes use these credentials</h3>
                <span className="flex justify-between items-center"><span className="">Email:</span> test@gmail.com</span>
                <span className="flex justify-between items-center"><span>Password:</span> 123456</span>
          </div>
      </div>
        <Footer />
    </>
  )
}



const TargetAudienceSection = () => {
  const targetAudiences = [
    {
      icon: <GlobeAltIcon className="w-12 h-12 text-indigo-600" />,
      title: 'Asia Region',
      description: 'Focusing on Urdu/Hindi speakers to enhance local hiring processes.',
    },
    {
      icon: <UserGroupIcon className="w-12 h-12 text-indigo-600" />,
      title: 'HR Professionals',
      description: 'Streamlining the hiring process for HR professionals with advanced AI tools.',
    },
    {
      icon: <BriefcaseIcon className="w-12 h-12 text-indigo-600" />,
      title: 'Recruiters',
      description: 'Helping recruiters identify the best talent efficiently and effectively.',
    },
    {
      icon: <UserGroupIcon className="w-12 h-12 text-indigo-600" />,
      title: 'Hiring Managers',
      description: 'Providing tools for hiring managers to make informed decisions.',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Our Target Audience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {targetAudiences.map((audience, index) => (
            <div key={index} className="relative p-8 border-2 border-gray-200 rounded-lg shadow-md bg-white">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  {audience.icon}
                </div>
                <h3 className="ml-4 text-2xl font-bold">{audience.title}</h3>
              </div>
              <p className="text-gray-600">{audience.description}</p>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const GoalsSection = () => {
  const goals = [
    {
      icon: '🌐',
      title: 'Multi-Language Mastery',
      description: 'Support for Urdu, Hindi, Arabic, and other languages to ensure a truly global reach. We are committed to breaking down language barriers by providing comprehensive multilingual support. This will enable users from diverse linguistic backgrounds to engage seamlessly with our platform, improving accessibility and inclusivity. Whether you are hiring from different regions or working with a diverse team, our multilingual capabilities will enhance communication and streamline the recruitment process.'
    },
    {
      icon: '📎',
      title: 'Seamless Resume Upload',
      description: 'Easily upload and manage resumes to streamline the interview process and ensure quick access to candidate information.',
    },
    {
      icon: '🎥',
      title: 'Video-Based Interviews',
      description: 'Conduct dynamic video interviews to assess candidates’ verbal communication skills and presentation in real-time.',
    }
  ];

  return (
    <section className="py-60">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-center mb-12">Our Ambitious Goals</h2>
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ff80b5] to-[#9089fc] opacity-10 rounded-xl blur-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Large and Prominent Grid Item */}
            <div className="relative bg-white p-8 rounded-xl shadow-2xl col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between">
              <div className="text-6xl mb-4">{goals[0].icon}</div>
              <h3 className="text-3xl font-bold mb-2">{goals[0].title}</h3>
              <p className="text-lg text-gray-700">{goals[0].description}</p>
            </div>
            {/* Smaller Grid Items */}
            <div className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
              <div className="text-5xl mb-4">{goals[1].icon}</div>
              <h3 className="text-2xl font-bold mb-2">{goals[1].title}</h3>
              <p className="text-gray-600">{goals[1].description}</p>
            </div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
              <div className="text-5xl mb-4">{goals[2].icon}</div>
              <h3 className="text-2xl font-bold mb-2">{goals[2].title}</h3>
              <p className="text-gray-600">{goals[2].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="relative pt-6 bg-transparent text-center mt-auto bottom-0">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 transform -translate-y-1  rounded-lg"></div>
      <p>&copy; 2024 InterviewLingo. All rights reserved.</p>
    </footer>
  );
};


const FeaturesSection = () => {
  const features = [
    {
      title: 'Text-Based Interviews',
      description: 'Conduct comprehensive text-based interviews with advanced AI analysis to gauge candidate responses effectively.',
    },
    {
      title: 'Audio Call-Based Interviews',
      description: 'Utilize real-time audio interviews with integrated feedback to evaluate communication skills and engagement.',
    },
    {
      title: 'Sentiment Analysis',
      description: 'Leverage AI-driven sentiment analysis to understand candidate emotions and attitudes during interviews.',
    },
    {
      title: 'Personality Assessment',
      description: 'Assess candidates’ personalities through AI tools to match them with roles suited to their traits and behaviors.',
    },
    {
      title: 'Personal Development Coaching',
      description: 'Offer personalized coaching and feedback to candidates to help them improve their interview skills and overall performance.',
    },
    {
      title: 'Job Suggestions',
      description: 'Receive tailored job suggestions based on candidates’ skills and preferences to streamline the job search process.',
    }
  ];

  return (
    <section className="py-52 bg-transparent relative">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-20">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ff80b5] to-[#9089fc] opacity-20 blur-xl transform scale-110"></div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
