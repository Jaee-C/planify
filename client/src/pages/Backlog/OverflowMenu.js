import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { useMutation } from "react-query";
import { deleteCurrentIssue } from "../../utils/api";

const OverflowMenu = ({ id }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mutation = useMutation(() => {
    return deleteCurrentIssue(id);
  })

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const deleteIssue = (issueId) => {
    mutation.mutate(issueId);
  }

  return (
    <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle className="btn-gray-300">
        <FontAwesomeIcon icon={faEllipsis} className="icon" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem header>Actions</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem onClick={deleteIssue}>Delete</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Foo Action</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default OverflowMenu;
