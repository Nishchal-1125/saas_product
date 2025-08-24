'use client'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Our <span className="gradient-text">E-Commerce Platform</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're dedicated to providing the best online shopping experience with quality products, 
              exceptional service, and innovative technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                To revolutionize online shopping by creating a platform that combines cutting-edge technology 
                with human-centered design, making it easier than ever for people to find and purchase the 
                products they love.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe that shopping should be enjoyable, secure, and accessible to everyone, regardless 
                of their technical expertise or location.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" 
                alt="Our mission" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Customer First</h3>
                <p className="text-gray-600">
                  Every decision we make is centered around creating value for our customers.
                </p>
              </div>
            </div>
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Assurance</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in everything from products to customer service.
                </p>
              </div>
            </div>
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="card-body">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Innovation</h3>
                <p className="text-gray-600">
                  We continuously evolve our platform using the latest technology and user feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate people behind our platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="card-body">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="John Smith" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">John Smith</h3>
                <p className="text-blue-600 font-medium mb-3">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Passionate about creating exceptional user experiences and building technology that matters.
                </p>
              </div>
            </div>
            <div className="card text-center group">
              <div className="card-body">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612e605?w=150&h=150&fit=crop&crop=face" 
                  alt="Sarah Johnson" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Sarah Johnson</h3>
                <p className="text-blue-600 font-medium mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Leading our technical innovation with expertise in scalable systems and modern architecture.
                </p>
              </div>
            </div>
            <div className="card text-center group">
              <div className="card-body">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
                  alt="Emily Chen" 
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Emily Chen</h3>
                <p className="text-blue-600 font-medium mb-3">Head of Design</p>
                <p className="text-gray-600 text-sm">
                  Crafting beautiful and intuitive experiences that delight users and drive engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Impact</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2M+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
