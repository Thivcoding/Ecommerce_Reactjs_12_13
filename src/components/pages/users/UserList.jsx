import { useEffect, useState } from 'react'
import { deleteUserAPi, getAllUsersAPi } from '../../services/userService'
import { Link } from 'react-router-dom';

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading,setLoading] = useState(false);

    const fetchUsers = async () => {
      setLoading(true)
        try {
            const response = await getAllUsersAPi();
            setUsers(response.data.users);
            // console.log(response);   
        } catch (error) {
            console.error('Error fetching users:', error);
        }finally{
          setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

    // Delete user
    const deleteProduct = async (id)=>{
      setLoading(true);
      try {
          const res = await deleteUserAPi(id); 
          alert(res.data.message);
          fetchUsers();
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

  if (isLoading) {
    return (
      <div
        className="vh-100 vw-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
        }}
      >
        <div className="text-center text-white">
          
          {/* Spinner */}
          <div
            className="spinner-border text-light mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></div>

          {/* Text */}
          <h5 className="fw-bold">Loading...</h5>
          <p className="text-secondary mb-0">
            Please wait while we prepare your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
            <div>
              <h3 className="mb-1">User Management</h3>
              <p className="text-muted mb-0">View and manage user accounts with quick actions.</p>
            </div>
            <Link to={"/admin/users/create"} type="button" className="btn btn-primary btn-sm">
              <i className="bi bi-person-plus me-2" /> Add New User
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-uppercase text-muted small">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img src={user.image_url} alt={user.name} className="rounded-circle" width="48" height="48" />
                        <div>
                          <h6 className="mb-0">{user.name}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/admin/users/edit/${user.id}`} type="button" className="btn btn-warning btn-sm">
                          <i className="bi bi-pencil-square me-1" /> Update
                        </Link>
                        <button onClick={() => {
                                      if (confirm("Are you sure you want to delete this user?")) {
                                        deleteProduct(user.id);
                                      }}} type="button" className="btn btn-danger btn-sm">
                          <i className="bi bi-trash me-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList
