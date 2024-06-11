import React, { useEffect } from "react";
import { removeAllMembers, reorderMembers } from "../redux/members/reducer.js";
import { useDispatch, useSelector } from "react-redux";
import {getMembersAsync} from "../redux/members/thunks.js";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import MiniMemberCard from "./MiniMemberCard.jsx";

function MemberContainer() {
  const crew = useSelector((state) => state.members.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersAsync());
  }, []);

  const handleClearMembers = () => {
    dispatch(removeAllMembers());
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    dispatch(
      reorderMembers({
        srcIndex: result.source.index,
        destinationIndex: result.destination.index
      })
    );
  };

  return (
    <>
      <div id="team-display">
        <div>
          <h2 className="mulish-heading">Your Crew</h2>
          {/*<ul id="team-list">*/}
          {/*  {crew.map((crewMember) => (*/}
          {/*    <li key={crewMember.memberId} className="each-card">*/}
          {/*      <MiniMemberCard crewMember={crewMember} />*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable-crew">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  id="team-list"
                  style={{
                    backgroundColor: "rgba(173, 216, 230, 0.3)",
                    borderRadius: 10
                  }}
                >
                  {crew.map((member, index) => (
                    <Draggable key={member.memberId} draggableId={String(member.memberId)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={"draggable-member"}
                        >
                          <MiniMemberCard crewMember={member} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="center">
            <button id="clear-team-button" onClick={() => handleClearMembers()}>
              Clear Pirates
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberContainer;
