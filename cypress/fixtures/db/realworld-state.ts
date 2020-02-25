export const realWorldState = {
  document: {
    status: "loaded",
    content: {
      openapi: "3.0.1",
      info: {
        title: "Conduit API",
        description: "Conduit API",
        contact: {
          name: "RealWorld",
          url: "https://realworld.io"
        },
        license: {
          name: "MIT License",
          url: "https://opensource.org/licenses/MIT"
        },
        version: "1.0.0"
      },
      servers: [
        {
          url: "/api"
        }
      ],
      paths: {
        "/users/login": {
          post: {
            tags: ["User and Authentication"],
            summary: "Existing user login",
            description: "Login for existing user",
            operationId: "Login",
            requestBody: {
              description: "Credentials to use",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LoginUserRequest"
                  }
                }
              },
              required: true
            },
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UserResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            "x-codegen-request-body-name": "body"
          }
        },
        "/users": {
          get: {
            tags: ["User and Authentication"],
            summary: "Get current user",
            description: "Gets the currently logged-in user",
            operationId: "GetCurrentUser",
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UserResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          },
          put: {
            tags: ["User and Authentication"],
            summary: "Update current user",
            description: "Updated user information for current user",
            operationId: "UpdateCurrentUser",
            requestBody: {
              description:
                "User details to update. At least **one** field is required.",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UpdateUserRequest"
                  }
                }
              },
              required: true
            },
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UserResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ],
            "x-codegen-request-body-name": "body"
          },
          post: {
            tags: ["User and Authentication"],
            summary: "Register a new user",
            description: "Register a new user",
            operationId: "CreateUser",
            requestBody: {
              description: "Details of the new user to register",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/NewUserRequest"
                  }
                }
              },
              required: true
            },
            responses: {
              "201": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UserResponse"
                    }
                  }
                }
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            "x-codegen-request-body-name": "body"
          }
        },
        "/profiles/{username}": {
          get: {
            tags: ["Profile"],
            summary: "Get a profile",
            description:
              "Get a profile of a user of the system. Auth is optional",
            operationId: "GetProfileByUsername",
            parameters: [
              {
                name: "username",
                in: "path",
                description: "Username of the profile to get",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/ProfileResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            }
          }
        },
        "/profiles/{username}/follow": {
          post: {
            tags: ["Profile"],
            summary: "Follow a user",
            description: "Follow a user by username",
            operationId: "FollowUserByUsername",
            parameters: [
              {
                name: "username",
                in: "path",
                description: "Username of the profile you want to follow",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/ProfileResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          },
          delete: {
            tags: ["Profile"],
            summary: "Unfollow a user",
            description: "Unfollow a user by username",
            operationId: "UnfollowUserByUsername",
            parameters: [
              {
                name: "username",
                in: "path",
                description: "Username of the profile you want to unfollow",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/ProfileResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          }
        },
        "/articles/feed": {
          get: {
            tags: ["Articles"],
            summary: "Get recent articles from users you follow",
            description:
              "Get most recent articles from users you follow. Use query parameters to limit. Auth is required",
            operationId: "GetArticlesFeed",
            parameters: [
              {
                name: "limit",
                in: "query",
                description:
                  "Limit number of articles returned (default is 20)",
                schema: {
                  type: "integer",
                  default: 20
                }
              },
              {
                name: "offset",
                in: "query",
                description: "Offset/skip number of articles (default is 0)",
                schema: {
                  type: "integer",
                  default: 0
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/MultipleArticlesResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          }
        },
        "/articles": {
          get: {
            tags: ["Articles"],
            summary: "Get recent articles globally",
            description:
              "Get most recent articles globally. Use query parameters to filter results. Auth is optional",
            operationId: "GetArticles",
            parameters: [
              {
                name: "tag",
                in: "query",
                description: "Filter by tag",
                schema: {
                  type: "string"
                }
              },
              {
                name: "author",
                in: "query",
                description: "Filter by author (username)",
                schema: {
                  type: "string"
                }
              },
              {
                name: "favorited",
                in: "query",
                description: "Filter by favorites of a user (username)",
                schema: {
                  type: "string"
                }
              },
              {
                name: "limit",
                in: "query",
                description:
                  "Limit number of articles returned (default is 20)",
                schema: {
                  type: "integer",
                  default: 20
                }
              },
              {
                name: "offset",
                in: "query",
                description: "Offset/skip number of articles (default is 0)",
                schema: {
                  type: "integer",
                  default: 0
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/MultipleArticlesResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            }
          },
          post: {
            tags: ["Articles"],
            summary: "Create an article",
            description: "Create an article. Auth is required",
            operationId: "CreateArticle",
            requestBody: {
              description: "Article to create",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/NewArticleRequest"
                  }
                }
              },
              required: true
            },
            responses: {
              "201": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/SingleArticleResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ],
            "x-codegen-request-body-name": "article"
          }
        },
        "/articles/{slug}": {
          get: {
            tags: ["Articles"],
            summary: "Get an article",
            description: "Get an article. Auth not required",
            operationId: "GetArticle",
            parameters: [
              {
                name: "slug",
                in: "path",
                description: "Slug of the article to get",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/SingleArticleResponse"
                    }
                  }
                }
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            }
          },
          put: {
            tags: ["Articles"],
            summary: "Update an article",
            description: "Update an article. Auth is required",
            operationId: "UpdateArticle",
            parameters: [
              {
                name: "slug",
                in: "path",
                description: "Slug of the article to update",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              description: "Article to update",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UpdateArticleRequest"
                  }
                }
              },
              required: true
            },
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/SingleArticleResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ],
            "x-codegen-request-body-name": "article"
          },
          delete: {
            tags: ["Articles"],
            summary: "Delete an article",
            description: "Delete an article. Auth is required",
            operationId: "DeleteArticle",
            parameters: [
              {
                name: "slug",
                in: "path",
                description: "Slug of the article to delete",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {}
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          }
        },
        "/articles/{slug}/comments": {
          get: {
            tags: ["Comments"],
            summary: "Get comments for an article",
            description: "Get the comments for an article. Auth is optional",
            operationId: "GetArticleComments",
            parameters: [
              {
                name: "slug",
                in: "path",
                description:
                  "Slug of the article that you want to get comments for",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/MultipleCommentsResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            }
          },
          post: {
            tags: ["Comments"],
            summary: "Create a comment for an article",
            description: "Create a comment for an article. Auth is required",
            operationId: "CreateArticleComment",
            parameters: [
              {
                name: "slug",
                in: "path",
                description:
                  "Slug of the article that you want to create a comment for",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            requestBody: {
              description: "Comment you want to create",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/NewCommentRequest"
                  }
                }
              },
              required: true
            },
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/SingleCommentResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ],
            "x-codegen-request-body-name": "comment"
          }
        },
        "/articles/{slug}/comments/{id}": {
          delete: {
            tags: ["Comments"],
            summary: "Delete a comment for an article",
            description: "Delete a comment for an article. Auth is required",
            operationId: "DeleteArticleComment",
            parameters: [
              {
                name: "slug",
                in: "path",
                description:
                  "Slug of the article that you want to delete a comment for",
                required: true,
                schema: {
                  type: "string"
                }
              },
              {
                name: "id",
                in: "path",
                description: "ID of the comment you want to delete",
                required: true,
                schema: {
                  type: "integer"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {}
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          }
        },
        "/articles/{slug}/favorite": {
          post: {
            tags: ["Favorites"],
            summary: "Favorite an article",
            description: "Favorite an article. Auth is required",
            operationId: "CreateArticleFavorite",
            parameters: [
              {
                name: "slug",
                in: "path",
                description: "Slug of the article that you want to favorite",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/SingleArticleResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          },
          delete: {
            tags: ["Favorites"],
            summary: "Unfavorite an article",
            description: "Unfavorite an article. Auth is required",
            operationId: "DeleteArticleFavorite",
            parameters: [
              {
                name: "slug",
                in: "path",
                description: "Slug of the article that you want to unfavorite",
                required: true,
                schema: {
                  type: "string"
                }
              }
            ],
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/SingleArticleResponse"
                    }
                  }
                }
              },
              "401": {
                description: "Unauthorized",
                content: {}
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            },
            security: [
              {
                Token: []
              }
            ]
          }
        },
        "/tags": {
          get: {
            summary: "Get tags",
            description: "Get tags. Auth not required",
            responses: {
              "200": {
                description: "OK",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/TagsResponse"
                    }
                  }
                }
              },
              "422": {
                description: "Unexpected error",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/GenericErrorModel"
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        schemas: {
          LoginUser: {
            required: ["email", "password"],
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              password: {
                type: "string",
                format: "password"
              }
            }
          },
          LoginUserRequest: {
            required: ["user"],
            type: "object",
            properties: {
              user: {
                $ref: "#/components/schemas/LoginUser"
              }
            }
          },
          NewUser: {
            required: ["email", "password", "username"],
            type: "object",
            properties: {
              username: {
                type: "string"
              },
              email: {
                type: "string"
              },
              password: {
                type: "string",
                format: "password"
              }
            }
          },
          NewUserRequest: {
            required: ["user"],
            type: "object",
            properties: {
              user: {
                $ref: "#/components/schemas/NewUser"
              }
            }
          },
          User: {
            required: ["bio", "email", "image", "token", "username"],
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              token: {
                type: "string"
              },
              username: {
                type: "string"
              },
              bio: {
                type: "string"
              },
              image: {
                type: "string"
              }
            }
          },
          UserResponse: {
            required: ["user"],
            type: "object",
            properties: {
              user: {
                $ref: "#/components/schemas/User"
              }
            }
          },
          UpdateUser: {
            type: "object",
            properties: {
              email: {
                type: "string"
              },
              token: {
                type: "string"
              },
              username: {
                type: "string"
              },
              bio: {
                type: "string"
              },
              image: {
                type: "string"
              }
            }
          },
          UpdateUserRequest: {
            required: ["user"],
            type: "object",
            properties: {
              user: {
                $ref: "#/components/schemas/UpdateUser"
              }
            }
          },
          ProfileResponse: {
            required: ["profile"],
            type: "object",
            properties: {
              profile: {
                $ref: "#/components/schemas/Profile"
              }
            }
          },
          Profile: {
            required: ["bio", "following", "image", "username"],
            type: "object",
            properties: {
              username: {
                type: "string"
              },
              bio: {
                type: "string"
              },
              image: {
                type: "string"
              },
              following: {
                type: "boolean"
              }
            }
          },
          Article: {
            required: [
              "author",
              "body",
              "createdAt",
              "description",
              "favorited",
              "favoritesCount",
              "slug",
              "tagList",
              "title",
              "updatedAt"
            ],
            type: "object",
            properties: {
              slug: {
                type: "string"
              },
              title: {
                type: "string"
              },
              description: {
                type: "string"
              },
              body: {
                type: "string"
              },
              tagList: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              createdAt: {
                type: "string",
                format: "date-time"
              },
              updatedAt: {
                type: "string",
                format: "date-time"
              },
              favorited: {
                type: "boolean"
              },
              favoritesCount: {
                type: "integer"
              },
              author: {
                $ref: "#/components/schemas/Profile"
              }
            }
          },
          SingleArticleResponse: {
            required: ["article"],
            type: "object",
            properties: {
              article: {
                $ref: "#/components/schemas/Article"
              }
            }
          },
          MultipleArticlesResponse: {
            required: ["articles", "articlesCount"],
            type: "object",
            properties: {
              articles: {
                type: "array",
                minItems: 5,
                maxItems: 5,
                items: {
                  $ref: "#/components/schemas/Article"
                }
              },
              articlesCount: {
                type: "integer"
              }
            }
          },
          NewArticle: {
            required: ["body", "description", "title"],
            type: "object",
            properties: {
              title: {
                type: "string"
              },
              description: {
                type: "string"
              },
              body: {
                type: "string"
              },
              tagList: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          },
          NewArticleRequest: {
            required: ["article"],
            type: "object",
            properties: {
              article: {
                $ref: "#/components/schemas/NewArticle"
              }
            }
          },
          UpdateArticle: {
            type: "object",
            properties: {
              title: {
                type: "string"
              },
              description: {
                type: "string"
              },
              body: {
                type: "string"
              }
            }
          },
          UpdateArticleRequest: {
            required: ["article"],
            type: "object",
            properties: {
              article: {
                $ref: "#/components/schemas/UpdateArticle"
              }
            }
          },
          Comment: {
            required: ["author", "body", "createdAt", "id", "updatedAt"],
            type: "object",
            properties: {
              id: {
                type: "integer"
              },
              createdAt: {
                type: "string",
                format: "date-time"
              },
              updatedAt: {
                type: "string",
                format: "date-time"
              },
              body: {
                type: "string"
              },
              author: {
                $ref: "#/components/schemas/Profile"
              }
            }
          },
          SingleCommentResponse: {
            required: ["comment"],
            type: "object",
            properties: {
              comment: {
                $ref: "#/components/schemas/Comment"
              }
            }
          },
          MultipleCommentsResponse: {
            required: ["comments"],
            type: "object",
            properties: {
              comments: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Comment"
                }
              }
            }
          },
          NewComment: {
            required: ["body"],
            type: "object",
            properties: {
              body: {
                type: "string"
              }
            }
          },
          NewCommentRequest: {
            required: ["comment"],
            type: "object",
            properties: {
              comment: {
                $ref: "#/components/schemas/NewComment"
              }
            }
          },
          TagsResponse: {
            required: ["tags"],
            type: "object",
            properties: {
              tags: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          },
          GenericErrorModel: {
            required: ["errors"],
            type: "object",
            properties: {
              errors: {
                required: ["body"],
                type: "object",
                properties: {
                  body: {
                    type: "array",
                    items: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        },
        securitySchemes: {
          Token: {
            type: "apiKey",
            description:
              "For accessing the protected API resources, you must have received a a valid JWT token after registering or logging in. This JWT token must then be used for all protected resources by passing it in via the 'Authorization' header.\n\nA JWT token is generated by the API by either registering via /users or logging in via /users/login.\n\nThe following format must be in the 'Authorization' header :\n\n    Token: xxxxxx.yyyyyyy.zzzzzz\n    \n",
            name: "Authorization",
            in: "header"
          }
        }
      },
      playground: {}
    },
    tree: [
      {
        type: "Branch",
        title: "Paths",
        ref: "#/paths",
        children: [
          {
            type: "Branch",
            title: "/users/login",
            ref: "#/paths/~1users~1login",
            children: [
              {
                type: "Branch",
                title: "post - Login",
                ref: "#/paths/~1users~1login/post",
                children: [
                  {
                    type: "Leaf",
                    title: "requestBody",
                    ref:
                      "#/paths/~1users~1login/post/requestBody/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1users~1login/post/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1users~1login/post/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/users",
            ref: "#/paths/~1users",
            children: [
              {
                type: "Branch",
                title: "get - GetCurrentUser",
                ref: "#/paths/~1users/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1users/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1users/get/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "post - CreateUser",
                ref: "#/paths/~1users/post",
                children: [
                  {
                    type: "Leaf",
                    title: "requestBody",
                    ref:
                      "#/paths/~1users/post/requestBody/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 201",
                    ref:
                      "#/paths/~1users/post/responses/201/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1users/post/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "put - UpdateCurrentUser",
                ref: "#/paths/~1users/put",
                children: [
                  {
                    type: "Leaf",
                    title: "requestBody",
                    ref:
                      "#/paths/~1users/put/requestBody/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1users/put/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1users/put/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/profiles/{username}",
            ref: "#/paths/~1profiles~1{username}",
            children: [
              {
                type: "Branch",
                title: "get - GetProfileByUsername",
                ref: "#/paths/~1profiles~1{username}/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1profiles~1{username}/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1profiles~1{username}/get/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/profiles/{username}/follow",
            ref: "#/paths/~1profiles~1{username}~1follow",
            children: [
              {
                type: "Branch",
                title: "post - FollowUserByUsername",
                ref: "#/paths/~1profiles~1{username}~1follow/post",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1profiles~1{username}~1follow/post/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1profiles~1{username}~1follow/post/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "delete - UnfollowUserByUsername",
                ref: "#/paths/~1profiles~1{username}~1follow/delete",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1profiles~1{username}~1follow/delete/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1profiles~1{username}~1follow/delete/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/articles/feed",
            ref: "#/paths/~1articles~1feed",
            children: [
              {
                type: "Branch",
                title: "get - GetArticlesFeed",
                ref: "#/paths/~1articles~1feed/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1feed/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1feed/get/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/articles",
            ref: "#/paths/~1articles",
            children: [
              {
                type: "Branch",
                title: "get - GetArticles",
                ref: "#/paths/~1articles/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles/get/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "post - CreateArticle",
                ref: "#/paths/~1articles/post",
                children: [
                  {
                    type: "Leaf",
                    title: "requestBody",
                    ref:
                      "#/paths/~1articles/post/requestBody/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 201",
                    ref:
                      "#/paths/~1articles/post/responses/201/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles/post/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/articles/{slug}",
            ref: "#/paths/~1articles~1{slug}",
            children: [
              {
                type: "Branch",
                title: "get - GetArticle",
                ref: "#/paths/~1articles~1{slug}/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1{slug}/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}/get/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "put - UpdateArticle",
                ref: "#/paths/~1articles~1{slug}/put",
                children: [
                  {
                    type: "Leaf",
                    title: "requestBody",
                    ref:
                      "#/paths/~1articles~1{slug}/put/requestBody/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1{slug}/put/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}/put/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "delete - DeleteArticle",
                ref: "#/paths/~1articles~1{slug}/delete",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}/delete/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/articles/{slug}/comments",
            ref: "#/paths/~1articles~1{slug}~1comments",
            children: [
              {
                type: "Branch",
                title: "get - GetArticleComments",
                ref: "#/paths/~1articles~1{slug}~1comments/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1{slug}~1comments/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}~1comments/get/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "post - CreateArticleComment",
                ref: "#/paths/~1articles~1{slug}~1comments/post",
                children: [
                  {
                    type: "Leaf",
                    title: "requestBody",
                    ref:
                      "#/paths/~1articles~1{slug}~1comments/post/requestBody/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1{slug}~1comments/post/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}~1comments/post/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/articles/{slug}/comments/{id}",
            ref: "#/paths/~1articles~1{slug}~1comments~1{id}",
            children: [
              {
                type: "Branch",
                title: "delete - DeleteArticleComment",
                ref: "#/paths/~1articles~1{slug}~1comments~1{id}/delete",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}~1comments~1{id}/delete/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/articles/{slug}/favorite",
            ref: "#/paths/~1articles~1{slug}~1favorite",
            children: [
              {
                type: "Branch",
                title: "post - CreateArticleFavorite",
                ref: "#/paths/~1articles~1{slug}~1favorite/post",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1{slug}~1favorite/post/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}~1favorite/post/responses/422/content/application~1json/schema"
                  }
                ]
              },
              {
                type: "Branch",
                title: "delete - DeleteArticleFavorite",
                ref: "#/paths/~1articles~1{slug}~1favorite/delete",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1articles~1{slug}~1favorite/delete/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1articles~1{slug}~1favorite/delete/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          },
          {
            type: "Branch",
            title: "/tags",
            ref: "#/paths/~1tags",
            children: [
              {
                type: "Branch",
                title: "get",
                ref: "#/paths/~1tags/get",
                children: [
                  {
                    type: "Leaf",
                    title: "response - 200",
                    ref:
                      "#/paths/~1tags/get/responses/200/content/application~1json/schema"
                  },
                  {
                    type: "Leaf",
                    title: "response - 422",
                    ref:
                      "#/paths/~1tags/get/responses/422/content/application~1json/schema"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "Branch",
        title: "Schemas",
        ref: "#/components/schemas",
        children: [
          {
            type: "Leaf",
            title: "Article",
            ref: "#/components/schemas/Article"
          },
          {
            type: "Leaf",
            title: "Comment",
            ref: "#/components/schemas/Comment"
          },
          {
            type: "Leaf",
            title: "GenericErrorModel",
            ref: "#/components/schemas/GenericErrorModel"
          },
          {
            type: "Leaf",
            title: "LoginUser",
            ref: "#/components/schemas/LoginUser"
          },
          {
            type: "Leaf",
            title: "LoginUserRequest",
            ref: "#/components/schemas/LoginUserRequest"
          },
          {
            type: "Leaf",
            title: "MultipleArticlesResponse",
            ref: "#/components/schemas/MultipleArticlesResponse"
          },
          {
            type: "Leaf",
            title: "MultipleCommentsResponse",
            ref: "#/components/schemas/MultipleCommentsResponse"
          },
          {
            type: "Leaf",
            title: "NewArticle",
            ref: "#/components/schemas/NewArticle"
          },
          {
            type: "Leaf",
            title: "NewArticleRequest",
            ref: "#/components/schemas/NewArticleRequest"
          },
          {
            type: "Leaf",
            title: "NewComment",
            ref: "#/components/schemas/NewComment"
          },
          {
            type: "Leaf",
            title: "NewCommentRequest",
            ref: "#/components/schemas/NewCommentRequest"
          },
          {
            type: "Leaf",
            title: "NewUser",
            ref: "#/components/schemas/NewUser"
          },
          {
            type: "Leaf",
            title: "NewUserRequest",
            ref: "#/components/schemas/NewUserRequest"
          },
          {
            type: "Leaf",
            title: "Profile",
            ref: "#/components/schemas/Profile"
          },
          {
            type: "Leaf",
            title: "ProfileResponse",
            ref: "#/components/schemas/ProfileResponse"
          },
          {
            type: "Leaf",
            title: "SingleArticleResponse",
            ref: "#/components/schemas/SingleArticleResponse"
          },
          {
            type: "Leaf",
            title: "SingleCommentResponse",
            ref: "#/components/schemas/SingleCommentResponse"
          },
          {
            type: "Leaf",
            title: "TagsResponse",
            ref: "#/components/schemas/TagsResponse"
          },
          {
            type: "Leaf",
            title: "UpdateArticle",
            ref: "#/components/schemas/UpdateArticle"
          },
          {
            type: "Leaf",
            title: "UpdateArticleRequest",
            ref: "#/components/schemas/UpdateArticleRequest"
          },
          {
            type: "Leaf",
            title: "UpdateUser",
            ref: "#/components/schemas/UpdateUser"
          },
          {
            type: "Leaf",
            title: "UpdateUserRequest",
            ref: "#/components/schemas/UpdateUserRequest"
          },
          {
            type: "Leaf",
            title: "User",
            ref: "#/components/schemas/User"
          },
          {
            type: "Leaf",
            title: "UserResponse",
            ref: "#/components/schemas/UserResponse"
          }
        ]
      },
      {
        type: "Leaf",
        title: "Playground",
        ref: "#/playground"
      }
    ]
  }
};
