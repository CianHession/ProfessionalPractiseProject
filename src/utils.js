export const formatDate = (d) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(d);
    return date.toLocaleDateString("en-GB", options);
};
