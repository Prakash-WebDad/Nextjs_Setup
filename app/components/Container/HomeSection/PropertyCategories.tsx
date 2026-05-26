import CategoryCard from "@/app/common/CategoryCard";
import SectionWrapper from "@/app/common/SectionWrapper";

export default function PropertyCategories() {

    const categories = [
        {
            title: "New listings",
            count: 294,
            image:
                "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Price reduced",
            count: 111,
            image:
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Open houses",
            count: 116,
            image:
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Recently sold",
            count: 3208,
            image:
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Luxury homes",
            count: 87,
            image:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Family homes",
            count: 542,
            image:
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Modern villas",
            count: 76,
            image:
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1400&auto=format&fit=crop",
        },
        {
            title: "Beach houses",
            count: 63,
            image:
                "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1400&auto=format&fit=crop",
        },
    ];

    return (
        <SectionWrapper className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4   ">
                {categories?.map((item, index) => (
                    <CategoryCard
                        key={index}
                        title={item?.title}
                        count={item?.count}
                        image={item?.image}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}