type CategoryCardProps = {
    title: string;
    count: number;
    image: string;
};

const CategoryCard = ({ title, count, image }: CategoryCardProps) => {
    return (
        <div className="relative group overflow-hidden rounded-2xl h-[220px] w-full cursor-pointer">
            <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/39" />
            <div className="absolute top-5 left-5">
                <h3 className="text-white text-xl font-semibold">{title}</h3>
            </div>
            <div className="absolute top-5 right-5 bg-white text-black text-xs font-medium px-4 py-2 rounded-full">
                {count.toLocaleString()}
            </div>
        </div>
    );
};

export default CategoryCard