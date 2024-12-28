import { memo, useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Skeleton from 'react-loading-skeleton';
import { fetchUserList } from '../../../../data/axiosAPI/userList';

const UserList = () => {
    const [userList, setUserList] = useState();
    const [active, setActive] = useState(1);
    const [loadingUserList, setLoadingUserList] = useState(false);

    let items = [];
    for (let number = 1; number <= 2; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                disabled={number === active}
                onClick={() => {
                    setLoadingUserList(true);
                    setTimeout(() => {
                        setLoadingUserList(false);
                    }, 500);
                    setActive(number);
                }}
            >
                {number}
            </Pagination.Item>
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
        // eslint-disable-next-line
    }, [active]);
    return (
        <div className="User_List">
            USER LIST DEMO
            <ol>
                {userList && !loadingUserList ? (
                    userList.map((user) => (
                        <li key={user.id}>{`${user.id}: ${user.email}`}</li>
                    ))
                ) : (
                    <Skeleton width={160} count={6} />
                )}
            </ol>
            <Pagination>{items}</Pagination>
        </div>
    );
};

export default memo(UserList);
