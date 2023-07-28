import { memo, useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Skeleton from 'react-loading-skeleton';
import { fetchUserList } from '../../../../data/axiosAPI/userList';

const UserList = () => {
    const [userList, setUserList] = useState();
    const [active, setActive] = useState(1);

    let items = [];
    for (let number = 1; number <= 2; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => {
                    setActive(number);
                }}>
                {number}
            </Pagination.Item>,
        );
    }

    const getUserList = async () => {
        let userListRes = await fetchUserList(active);
        if (userListRes) {
            setUserList(userListRes.data);
        }
    };
    useEffect(() => {
        getUserList();
    }, [active]);
    return (
        <div className='User_List'>
            <ol>
                {userList ? (
                    userList.map((user) => (
                        <li key={user.id}>
                            {user.id}. {user.email}
                        </li>
                    ))
                ) : (
                    <Skeleton
                        width={200}
                        count={6}
                    />
                )}
            </ol>
            <Pagination>{items}</Pagination>
        </div>
    );
};

export default memo(UserList);
