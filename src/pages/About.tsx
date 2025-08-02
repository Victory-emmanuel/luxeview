import { motion } from "framer-motion";
import { Award, Users, TrendingUp, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { companyInfo } from "@/data/company";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "Industry Recognition",
      description:
        "Multiple awards for excellence in luxury real estate services",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Highly skilled professionals with decades of combined experience",
    },
    {
      icon: TrendingUp,
      title: "Market Leadership",
      description: "Consistently ranked among top luxury real estate firms",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "International connections for worldwide property opportunities",
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 bg-primary"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl text-text-primary mb-6 tracking-luxury">
              About LuxeView Elite
            </h1>
            <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
            <p className="font-body text-xl text-text-primary/80 leading-relaxed">
              {companyInfo.description}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-heading text-4xl text-text-secondary mb-6 tracking-luxury">
                  Our Mission
                </h2>
                <p className="font-body text-lg text-text-secondary/80 leading-relaxed mb-8">
                  {companyInfo.mission}
                </p>
                <div className="bg-white/5 p-6 rounded-lg">
                  <h3 className="font-heading text-xl text-text-secondary mb-4">
                    Core Values
                  </h3>
                  <ul className="space-y-2">
                    <li className="font-body text-text-secondary/80 flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      Excellence in every transaction
                    </li>
                    <li className="font-body text-text-secondary/80 flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      Integrity and transparency
                    </li>
                    <li className="font-body text-text-secondary/80 flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      Personalized client service
                    </li>
                    <li className="font-body text-text-secondary/80 flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      Innovation and expertise
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-heading text-4xl text-text-secondary mb-6 tracking-luxury">
                  Our Vision
                </h2>
                <p className="font-body text-lg text-text-secondary/80 leading-relaxed mb-8">
                  {companyInfo.vision}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="font-heading text-3xl text-accent mb-2">
                      {new Date().getFullYear() - parseInt(companyInfo.founded)}
                      +
                    </div>
                    <div className="font-body text-text-secondary/80 text-sm uppercase tracking-wide">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-3xl text-accent mb-2">
                      $2.5B+
                    </div>
                    <div className="font-body text-text-secondary/80 text-sm uppercase tracking-wide">
                      Properties Sold
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-3xl text-accent mb-2">
                      500+
                    </div>
                    <div className="font-body text-text-secondary/80 text-sm uppercase tracking-wide">
                      Happy Clients
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-3xl text-accent mb-2">
                      98%
                    </div>
                    <div className="font-body text-text-secondary/80 text-sm uppercase tracking-wide">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-6 tracking-luxury">
                Why Choose Us
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <p className="font-body text-xl text-text-primary/80 max-w-3xl mx-auto leading-relaxed">
                Our commitment to excellence and unparalleled service sets us
                apart in the luxury real estate market
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/30 transition-colors duration-300">
                    <achievement.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-heading text-xl text-text-primary mb-4 tracking-luxury">
                    {achievement.title}
                  </h3>
                  <p className="font-body text-text-primary/80 leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl text-text-secondary mb-6 tracking-luxury">
                Meet Our Team
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <p className="font-body text-xl text-text-secondary/80 max-w-3xl mx-auto leading-relaxed">
                Our experienced professionals are dedicated to providing
                exceptional service and expertise
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyInfo.team.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-accent/20 rounded-full mx-auto flex items-center justify-center">
                      <span className="font-heading text-2xl text-accent">
                        {agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-text-secondary mb-2 tracking-luxury">
                    {agent.name}
                  </h3>
                  <p className="font-body text-text-secondary/80 mb-4">
                    {agent.title}
                  </p>
                  <p className="font-body text-text-secondary/60 text-sm leading-relaxed">
                    {agent.bio}
                  </p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <div className="font-body text-text-secondary/60 text-xs">
                      📧 {agent.email}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-6 tracking-luxury">
                Our Story
              </h2>
              <div className="w-24 h-0.5 bg-accent mx-auto mb-8"></div>
              <div className="bg-primary border border-accent/20 rounded-lg p-8">
                <p className="font-body text-lg text-text-primary/80 leading-relaxed mb-6">
                  Founded in {companyInfo.founded}, LuxeView Elite began with a
                  simple yet ambitious vision: to redefine the luxury real
                  estate experience through unparalleled service, expertise, and
                  integrity.
                </p>
                <p className="font-body text-lg text-text-primary/80 leading-relaxed mb-6">
                  Over the years, we have built a reputation as one of the most
                  trusted names in luxury real estate, helping discerning
                  clients find their perfect properties in the world's most
                  prestigious locations.
                </p>
                <p className="font-body text-lg text-text-primary/80 leading-relaxed">
                  Today, we continue to set new standards in the industry,
                  combining traditional values with innovative approaches to
                  deliver exceptional results for our clients.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
