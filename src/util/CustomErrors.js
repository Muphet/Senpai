class MusicError extends Error {

}

class APIError extends Error {

}

class PermissionError extends Error {

}

class UsageError extends Error {

}

module.exports = { MusicError, APIError, UsageError, PermissionError };
