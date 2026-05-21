import { Search } from "lucide-react"

export const SearchInput = () => {
    return (
        <div className="flex-1 min-w-[350px] ml-auto md:ml-8">
            <div className="relative">
                <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-body-light-grey pointer-events-none"
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-9 pr-4 py-2 text-[13px] bg-[#ffff] rounded-[12px] text-body-action placeholder-body-light-grey focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
            </div>
        </div>
    )
}