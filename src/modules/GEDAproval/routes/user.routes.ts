const baseURL = window.apis.core;
const token = window.localStorage.getItem("token");
const userModelString: string | null = window.localStorage.getItem("userModel");
const userModal = userModelString && JSON.parse(userModelString ? userModelString : "");

export function GET_LISTS(page: number | undefined) {
  return {
    url: `${baseURL}/api/Quality/QualityConstraint/GetAll?currentPage=${page}`,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        userId: userModal.id,
      },
    },
  };
}

export function POST_UPSERT(body: {}) {
  return {
    url: `${baseURL}/api/Quality/QualityConstraint/Upsert`,
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        userId: userModal.id,
      },
      body: JSON.stringify({ body }),
    },
  };
}

export function DELETE_LIST(ids: {}) {
  return {
    url: `${baseURL}/api/Quality/QualityConstraint/Delete`,
    options: {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        userId: userModal.id,
      },
      body: JSON.stringify({ ids }),
    },
  };
}
