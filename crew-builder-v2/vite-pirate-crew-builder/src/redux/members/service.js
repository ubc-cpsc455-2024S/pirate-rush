const URL_PATH = "http://localhost:3000/members";

const addMember = async (member) => {
  const response = await fetch(URL_PATH, {
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
  const response = await fetch(URL_PATH, {
    method: "GET",
  });

  return response.json();
};

const deleteMember = async (memberId) => {
  await fetch(URL_PATH + "/" + memberId, {
    method: "DELETE",
  });

  return memberId;
};

const patchMemberVersion = async (memberId) => {
  const response = await fetch(URL_PATH + "/" + memberId, {
    method: "PATCH",
  });

  return response.json();
};

export default {
  addMember,
  getMembers,
  deleteMember,
  patchMemberVersion,
};
