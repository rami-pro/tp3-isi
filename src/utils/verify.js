const email = (mail) => {
    const re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(mail.toLowerCase())) {
        return { error: "not valid wilaya" };
    }
    return { success: true };
};

const address = (wilaya) => {
    if (wilaya > 48 && wilaya < 1) return { error: "not valid wilaya" };

    return { success: true };
};

const date = (date) => {
    const isDate = new Date(date);

    if (isDate == "Invalid Date") return { error: "not valid date" };

    return { success: true };
};

const minLength = (str, length) => {
    if (str.length < length) return { error: `minimum length is ${length}` };

    return { success: true };
};

module.exports = {
    email,
    address,
    minLength,
    date,
};
