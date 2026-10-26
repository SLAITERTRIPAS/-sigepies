import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

export interface Section {
  title: string;
  elementType: "text" | "table" | "bar-chart" | "line-chart" | "pie-chart" | "kpi";
  data: any;
}

interface SortableSectionProps {
  section: Section;
  onRemove: () => void;
}

const SortableSection: React.FC<SortableSectionProps> = ({ section, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-4 bg-white border rounded mb-2 shadow-sm">
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="text-gray-400" />
      </div>
      <span className="flex-grow font-medium">{section.title}</span>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700">
        <Trash2 size={18} />
      </button>
    </div>
  );
};

interface Props {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
}

export const EditableSectionList: React.FC<Props> = ({ sections, onSectionsChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.title === active.id);
      const newIndex = sections.findIndex((s) => s.title === over.id);

      onSectionsChange(arrayMove(sections, oldIndex, newIndex));
    }
  }

  const handleRemove = (title: string) => {
    onSectionsChange(sections.filter((s) => s.title !== title));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.title)} strategy={verticalListSortingStrategy}>
        {sections.map((section) => (
          <SortableSection key={section.title} section={section} onRemove={() => handleRemove(section.title)} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
