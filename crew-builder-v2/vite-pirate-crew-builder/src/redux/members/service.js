const addMember = async (member) => {
  const response = await fetch("http://localhost:3000/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });

  return getResponseData(response);
};

const getMembers = async () => {
  const response = await fetch("http://localhost:3000/members", {
    method: "GET",
  });
  return response.json();
};

const deleteMember = async (memberId) => {
  const response = await fetch(`http://localhost:3000/members/${memberId}`, {
    method: "DELETE",
  });

  return getResponseData(response);
};

async function getResponseData(response) {
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
}

export default {
  addMember,
  getMembers,
  deleteMember,
};
