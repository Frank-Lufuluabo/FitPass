import { SelectTrigger } from "@radix-ui/react-select";
import { Suspense } from "react";

function VenuePickerItem({ handle}: { handle: DocumentHandle}) {

}

export fonction VenuePicker({ value, onChange }: VenuePickerProps) {
    const { data: venues } = useDocuments({ DocumentType: "vvenue"});

    return(
        <Select value={value} onValueChanges={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select a venue" />
            </SelectTrigger>
            <SelectContent>
                {venues?.map((doc) => (
                    <Suspense
                    key={doc.documetId}
                    fallback={
                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            Loading...
                        </div>
                    }
                    >
                        <VenuePickerItem handle={doc} />
                    </Suspense>
                ))}
            </SelectContent>
        </Select>
    );
}