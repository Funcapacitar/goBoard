"use client";
import React, { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
  } from "@hello-pangea/dnd";
  import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Members{
    id:string
    nombre:string,
    vacantes:number,
    editado:boolean,
    iscomplete:boolean
}
interface MemberListProps {
  items: Members[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ListMembers = ({
items,
onEdit,
onReorder
}:MemberListProps) => {
    const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((member) => ({
      id: member.id,
      position: items.findIndex((item) => item.id === member.id)
    }));

    onReorder(bulkUpdateData);
  }
  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((member, index) => (
              <Draggable 
                key={member.id} 
                draggableId={member.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      member.iscomplete && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        member.iscomplete && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip
                        className="h-5 w-5"
                      />
                    </div>
                    {member.nombre}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {member.editado && (
                        <Badge>
                          Free
                        </Badge>
                      )}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          member.iscomplete && "bg-sky-700"
                        )}
                      >
                        {member.iscomplete ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(member.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
