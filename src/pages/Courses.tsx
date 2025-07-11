import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import coursesData from '../data/courses.json';
import { formatINR } from '@/utils/currency';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(coursesData.courses);
      setLoading(false);
    }, 500);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'free') return matchesSearch && course.price === 0;
    if (filter === 'paid') return matchesSearch && course.price > 0;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Browse through our extensive collection of courses and start learning today.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <select
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="mt-6 h-10 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x225?text=Course+Image';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatINR(course.price)}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-700">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/course/${course.id}`}
                      className="mt-4 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-700">No courses found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}
      </div>      
    </div>
  );
};

export default Courses;
