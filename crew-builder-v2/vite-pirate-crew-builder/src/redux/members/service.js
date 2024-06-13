const addMember = async (member) => {
  const response = await fetch("http://localhost:3000/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
};

const getMembers = async () => {
  const response = await fetch("http://localhost:3000/members", {
    method: "GET",
  });

  return response.json();
};

const deleteMember = async (memberId) => {
  const response = await fetch("http://localhost:3000/members/" + memberId, {
    method: "DELETE",
  });

  console.log(response)
  // TODO
};

export default {
  addMember,
  getMembers,
  deleteMember,
};
