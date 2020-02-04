export {
    getAllEvents,
    fetchEvent,
    saveEvent,
    updateEvent,
    deleteEvent,

};

const baseUrl = 'https://crudcrud.com/api/8449d736e1e44f0c9b0f01d65425eb9b/events';



const getAllEvents = () => fetch(baseUrl)
    .then(response => response.json())
    .then(eventsList => eventsList.map(({ _id, ...event }) => ({ ...event, id: _id })));

const fetchEvent = eventId => {
    return fetch(`${baseUrl}/${eventId}`)
        .then(response => {

            if (response.ok) {
                return response.json();
            }
            throw new Error('Server calls limit is exceeded. Need to update server URL');
        })
        .then(({ _id, ...event }) => ({ ...event, id: _id }))
}

const saveEvent = eventData => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(eventData),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Server calls limit is exceeded. Need to update server URL');
        })
};

const updateEvent = (eventId, eventData) => {
    return fetch(`${baseUrl}/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(eventData),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Server calls limit is exceeded. Need to update server URL');
        })
};

const deleteEvent = eventId => {
    return fetch(`${baseUrl}/${eventId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Server calls limit is exceeded. Need to update server URL');
        });
}