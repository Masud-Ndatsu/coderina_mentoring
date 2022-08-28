class UserMock {
  static async createUser({ body }) {
    body = {
      ...body,
      test: true,
    };
    return body;
  }
}

module.exports = { UserMock };
