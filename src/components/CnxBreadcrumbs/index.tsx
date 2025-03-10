import { ILevelObject } from "./types";

export function Breadcrumbs(items: ILevelObject[]) {
    const handleBreadcrumbs = (className: string) => {
        
    }
    return (
        <div>
            {items.map((item: ILevelObject) => (
                <button type= "button" onClick={() => handleBreadcrumbs(item.className)}>{item.title}</button>
            ))}
        </div>
    );
}