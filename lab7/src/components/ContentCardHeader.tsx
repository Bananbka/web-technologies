type ContentCardHeaderProps = {
    cardHeadline: string,
    description: string
}

export function ContentCardHeader({cardHeadline, description}: ContentCardHeaderProps) {
    cardHeadline = cardHeadline.toUpperCase();
    return <div>
        <h2 className="text-lg font-bold text-gray-800">{cardHeadline}</h2>
        <p className="text-sm text-gray-500 mb-6">{description}</p>
    </div>
}