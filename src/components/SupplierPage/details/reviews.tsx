import { Star } from "lucide-react";
import { reviw, supplier } from "../../../../types";
import { formatNumber } from "../../../../utils/helperFunctions";
import "swiper/css";
import CustomCarousel from "@/components/slider/ImageCarousel";
import ReviewCard from "@/components/cards/reviewsCard";
import { useEffect, useState } from "react";
import ReviewForm from "@/components/forms/reviewForm";
import { useTranslation } from "react-i18next";
interface reviewsProps {
  supplier: supplier;
}
export default function Reviews({ supplier }: reviewsProps) {
  const { t } = useTranslation();
  const [viewNavegation, setViewNavegation] = useState(false);
  useEffect(() => {
    const updateView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewNavegation(false);
      } else {
        setViewNavegation(true);
      }
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);
  const RatingBar = ({ stars, count }: { stars: number; count: number }) => {
    const percentage = supplier.reviews.total_reviews
      ? (count / supplier.reviews.total_reviews) * 100
      : 0;
    return (
      <div className="flex items-center gap-2 w-full">
        <p className="w-10 text-xs font-bold uppercase">
          {["ONE", "TWO", "THREE", "FOUR", "FIVE"][stars - 1]}
        </p>
        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        <div className="flex-1 h-1 bg-yellow-200 rounded-full">
          <div
            className="h-1 bg-yellow-500 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs font-bold w-10 text-end">
          {count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count}
        </p>
      </div>
    );
  };
  const generateReviewCards = (review: reviw[]) => {
    return review.map((review, index) => (
      <ReviewCard key={index} review={review} />
    ));
  };
  const reviewCard = generateReviewCards(supplier.reviews.customers_comments);
  return (
    <div className="flex flex-col gap-10 mt-4 text-gray-900  w-full">
      <h1 className="text-xl md:text-3xl text-center font-bold">Reviews</h1>
      {/* header */}
      <div className="flex items-center justify-between w-full px-2 md:px-10 lg:px-20">
        <div className="flex w-1/3 md:w-1/4 flex-col gap-2">
          <p className="text-sm md:text-lg font-bold">Totla reviews</p>
          <p className="text-lg md:text-2xl font-bold">
            {formatNumber(supplier.reviews.total_reviews)}
          </p>
          <p className="text-xs md:text-lg text-gray-400">
            {t("suppliers.Total_reviews_on_this_year")}
          </p>
        </div>
        <div className="w-[2px] h-25 bg-gray-300"></div>
        <div className="flex w-1/3 md:w-1/4 flex-col gap-2">
          <p className="text-sm md:text-lg font-bold">
            {t("suppliers.Average_Rating")}
          </p>
          <div className="flex items-center w-full gap-3">
            <p className=" text-lg md:text-2xl font-bold">
              {supplier.reviews.average_reviews}
            </p>
            <div className="flex items-center gap-1">
              {supplier.reviews?.average_reviews &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-3 md:w-5 ${
                      index < supplier.reviews.average_reviews
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-400 text-gray-400"
                    }`}
                  />
                ))}
            </div>
          </div>
          <p className="text-xs md:text-lg text-gray-400">
            {t("suppliers.Average_rating_on_this_year")}
          </p>
        </div>
        <div className="w-[2px] hidden md:block h-25 bg-gray-300"></div>
        <div className="hidden md:flex w-1/4 flex-col">
          {supplier.reviews.ratings ? (
            <div className="flex flex-col gap-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <RatingBar
                  key={star}
                  stars={star}
                  count={supplier.reviews.ratings![star] || 0}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {t("suppliers.No_ratings_available")}.
            </p>
          )}
        </div>
        {/* cust comments  */}
      </div>
      <div className="md:hidden flex w-full px-2 md:px-10 lg:px-20 flex-col">
        {supplier.reviews.ratings ? (
          <div className="flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <RatingBar
                key={star}
                stars={star}
                count={supplier.reviews.ratings![star] || 0}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {" "}
            {t("suppliers.No_ratings_available")}.
          </p>
        )}
      </div>
      {/* reviews */}
      <div className="flex flex-col items-center w-full px-2 md:px-10 lg:px-20 py-10 bg-[#006D7733] gap-5">
        <h1 className="text-xl md:text-3xl font-bold">
          {t("suppliers.What_Our_Customers_Says")}
        </h1>

        <CustomCarousel
          data={reviewCard}
          slidesPerView={[1, 1.5, 3]}
          spaceBetween={[0, 0, 0]}
          showNavigation={viewNavegation}
        />
      </div>
      <div className="flex items-center justify-center">
        <ReviewForm />
      </div>
    </div>
  );
}
