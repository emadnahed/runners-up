import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Clock, Users, BookOpen, Check } from 'lucide-react';
import coursesData from '../data/courses.json';
import { formatINR } from '@/utils/currency';
import { useToast } from '@/components/ui/use-toast';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find the course with the matching ID
  const course = coursesData.courses.find(c => c.id.toString() === id);
  
const handleEnroll = async () => {
    if (!course) return;
    try {
      toast({ title: 'Creating Order...', description: 'Please wait while we create your order.', variant: 'default' });
      const response = await fetch('https://test.paymadi.com/v1/api/pay/payment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJjcmVhdGVkVGltZSI6MTc0ODUwMzk4MDA5MCwiZXhwaXJ5VGltZSI6MTc0ODUwNDAxMDA5MCwiY2xpZW50SWQiOiIiLCJ1c2VyVHlwZSI6IkFETUlOIiwidXNlcklkIjoiUEFZTUFESTI0OTEiLCJtb2JpbGVObyI6IjgwNTA0OTkwMTAifQ.ZBJ7CIfQ4SoLTxbW0xjsgtr3S8J1bNEtKWKcIMufudk'
        },
        body: JSON.stringify({
          currency: 'INR',
          devicInfo: {
            deviceId: 'unknown',
            latitude: 13.022767041136825,
            longitude: 77.61033784715508
          },
          payeeId: '66ed3e907e99ab545c9a4847',
          paymentType: 'VENDOR_PAYMENT',
          paymentTypeId: 1,
          userId: 'PAYMADI1716485053361',
          categoryType: 'EMPTY',
          remarks: 'Purchase',
          selectedCardType: 'Credit Card',
          selectedCardBank: 'Other Banks',
          selectedCardTypeId: '66b6ef3511ef6f3f1d7665df',
          selectedBankTypeId: '66b6f0be11ef6f3f1d7665e1',
          settlementType: 'REGULAR_PAY',
          settlementTypeId: 3,
          gstFee: 18,
          serviceFee: 1.95,
          priceBreakUp: {
            feeBearer: 'user',
            serviceFeeAmount: '234',
            gstAmount: '42.12',
            settlementAmount: '12000',
            totalAmount: 12276
          }
        })
      });
      const apiResult = await response.json();
      if (apiResult && apiResult.data) {
        const data = JSON.parse(apiResult.data);
        navigate(`/orders/PM-CF-001?sessionId=${encodeURIComponent(data.token)}&orderId=${encodeURIComponent(data.referenceId)}`);
      } else {
        toast({ title: 'Order Creation Failed', description: apiResult?.message || 'Could not create order.', variant: 'destructive' });
      }
    } catch (err) {
      toast({ title: 'Order Creation Failed', description: 'An error occurred while creating the order.', variant: 'destructive' });
    }
  };

  const handleAddToWishlist = () => {
    // In a real app, this would add to wishlist
    toast({
      title: 'Added to Wishlist',
      description: `${course?.title} has been added to your wishlist`,
      variant: 'default',
    });
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course not found</h2>
          <Button onClick={() => navigate('/courses')}>
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Course+Image';
                }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500 mr-4">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-gray-700 font-medium">
                        {course.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-5 h-5 mr-1" />
                      <span>100+ students</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price > 0 ? formatINR(course.price) : 'Free'}
                  </span>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">{course.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Course feature {i + 1} that you'll learn in this comprehensive course</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {course.price > 0 ? formatINR(course.price) : 'Free'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleAddToWishlist}
                  >
                    Add to Wishlist
                  </Button>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h4 className="font-medium mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span>10 hours on-demand video</span>
                    </li>
                    <li className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                      <span>5 articles</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Full lifetime access</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
