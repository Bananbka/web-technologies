import * as React from "react";

type ContentCardProps = {
    children?: React.ReactNode,
    flex: "row" | "col",

}

export function ContentCard({children, flex}: ContentCardProps) {
    const styles: string =
        "w-full max-w-4xl bg-white shadow-md rounded-md flex flex-wrap gap-2 p-4 " + `flex-${flex}`;
    return <div className={styles}>
        {children}
    </div>
}