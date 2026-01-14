import { Link } from 'react-router-dom';
import { FiSearch, FiBriefcase, FiAward, FiMapPin, FiStar, FiUsers, FiTrendingUp, FiShield, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Home = () => {
  const stats = [
    { label: 'Verified Workers', value: '1,500+', icon: FiUsers },
    { label: 'Active Employers', value: '500+', icon: FiBriefcase },
    { label: 'Jobs Completed', value: '3,000+', icon: FiTrendingUp },
    { label: 'Average Rating', value: '4.8/5', icon: FiStar },
  ];

  const features = [
    {
      icon: FiAward,
      title: 'Verified Certificates',
      description: 'AI-powered certificate verification ensures authentic skilled workers',
    },
    {
      icon: FiMapPin,
      title: 'GPS-Based Matching',
      description: 'Find workers near you with our location-based search',
    },
    {
      icon: FiStar,
      title: 'Transparent Reviews',
      description: 'Make informed decisions with our honest rating system',
    },
    {
      icon: FiShield,
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with industry-standard security',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Create Profile',
      description: 'Sign up as a worker or employer and complete your profile',
    },
    {
      step: '2',
      title: 'Search & Connect',
      description: 'Find the perfect match using our advanced search filters',
    },
    {
      step: '3',
      title: 'Work & Review',
      description: 'Complete jobs and build your reputation with reviews',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Connect with Verified Skilled Workers
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Kerala's most trusted platform connecting skilled workers with employers in Tier 3 cities.
                No middlemen, direct communication, transparent ratings.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth/signup" className="btn bg-secondary-500 hover:bg-secondary-600 text-white">
                  Get Started
                  <FiArrowRight />
                </Link>
                <Link to="/workers" className="btn bg-white/10 hover:bg-white/20 text-white border-2 border-white">
                  Find Workers
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600"
                alt="Workers"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-10 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card text-center"
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-secondary-500" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-secondary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose SkillConnect?
            </h2>
            <p className="text-xl text-gray-600">
              Built specifically for Kerala's Tier 3 cities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <Icon className="w-12 h-12 text-secondary-500 mb-4" />
                  <h3 className="text-xl font-heading font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of workers and employers on SkillConnect Kerala
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/auth/signup?role=worker" className="btn bg-white text-secondary-600 hover:bg-gray-100">
              Sign Up as Worker
            </Link>
            <Link to="/auth/signup?role=employer" className="btn bg-white/10 hover:bg-white/20 text-white border-2 border-white">
              Sign Up as Employer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
