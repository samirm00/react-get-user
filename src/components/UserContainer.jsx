import { useState, useEffect } from 'react';
import axios from 'axios';
import './UserContainer.css';
import User from './User';
import Loading from './Loading';

const UserContainer = () => {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        nextDisable: false,
        previousDisable: true
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(
                    `https://jsonplaceholder.typicode.com/users/${id}`
                );

                if (res.status === 200) {
                    setUser(res.data);
                    setError('');
                } else {
                    throw new Error(
                        `Failed to fetch user with status : ${res.status}`
                    );
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [id]);

    const handlePagination = (direction) => {
        if (direction === 'next') {
            setId((prevId) => prevId + 1);
        } else if (direction === 'previous') {
            setId((prevId) => prevId - 1);
        }
    };

    useEffect(() => {
        setPagination({
            nextDisable: id >= 10,
            previousDisable: id <= 1
        });
    }, [id]);

    return (
        <div className="container">
            {loading && <Loading />}
            {error && <p>{error}</p>}
            {user && <User user={user} />}

            <div>
                <button
                    disabled={pagination.previousDisable}
                    onClick={() => handlePagination('previous')}
                >
                    Previous
                </button>
                <button
                    disabled={pagination.nextDisable}
                    onClick={() => handlePagination('next')}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserContainer;
