type TagProps = {
    id: number;
    text: string;
    onDelete: () => void;
}

export function Tag({id, text, onDelete}: TagProps) {
    const styles = "bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium flex flex-row gap-2 self-center";
    return <div key={id} className={styles}>
        {text}
        <span onClick={onDelete} className={"hover:cursor-pointer"}>
            ✖
        </span>
    </div>
}