# Facet query
Each 'level' is indexed as a facet which we can then return bucket values for like so:

```
{
  "$searchMeta": {
    "index": "nestedFacetsSearchIndex",
    "facet": {
      "operator": {
        "compound": {
          "must": [
            {
              "text": {
                "query": "oahu",
                "path": {
                  "wildcard": "*"
                }
              }
            }
          ],
          "filter": []
        }
      },
      "facets": {
        "room_type": {
          "type": "string",
          "path": "room_type"
        },
        "details_level0": {
          "type": "string",
          "path": "details.level0"
        },
        "details_level1": {
          "type": "string",
          "path": "details.level1"
        },
        "details_level2": {
          "type": "string",
          "path": "details.level2"
        },
        "details_level3": {
          "type": "string",
          "path": "details.level3"
        },
        "details_level4": {
          "type": "string",
          "path": "details.level4"
        }
      }
    }
  }
}
```

# Facet response
This returns individual values like this:

```
{
  "count": {
    "lowerBound": {
      "$numberLong": "288"
    }
  },
  "facet": {
    "details_level1": {
      "buckets": [
        {
          "_id": "United States/Oahu",
          "count": {
            "$numberLong": "253"
          }
        },
        {
          "_id": "United States/The Big Island",
          "count": {
            "$numberLong": "17"
          }
        },
        {
          "_id": "United States/Maui",
          "count": {
            "$numberLong": "14"
          }
        },
        {
          "_id": "United States/Kauai",
          "count": {
            "$numberLong": "2"
          }
        },
        {
          "_id": "Hong Kong/Hong Kong",
          "count": {
            "$numberLong": "1"
          }
        },
        {
          "_id": "United States/",
          "count": {
            "$numberLong": "1"
          }
        }
      ]
    },
    "details_level2": {
      "buckets": [
        {
          "_id": "United States/Oahu/House",
          "count": {
            "$numberLong": "74"
          }
        },
        {
          "_id": "United States/Oahu/Condominium",
          "count": {
            "$numberLong": "67"
          }
        },
        {
          "_id": "United States/Oahu/Apartment",
          "count": {
            "$numberLong": "60"
          }
        },
        {
          "_id": "United States/Oahu/Guest suite",
          "count": {
            "$numberLong": "13"
          }
        },
        {
          "_id": "United States/Oahu/Guesthouse",
          "count": {
            "$numberLong": "11"
          }
        },
        {
          "_id": "United States/Maui/Condominium",
          "count": {
            "$numberLong": "8"
          }
        },
        {
          "_id": "United States/Oahu/Villa",
          "count": {
            "$numberLong": "4"
          }
        },
        {
          "_id": "United States/Oahu/Bungalow",
          "count": {
            "$numberLong": "3"
          }
        },
        {
          "_id": "United States/Oahu/Cottage",
          "count": {
            "$numberLong": "3"
          }
        },
        {
          "_id": "United States/The Big Island/Condominium",
          "count": {
            "$numberLong": "3"
          }
        }
      ]
    },
    "details_level0": {
      "buckets": [
        {
          "_id": "United States",
          "count": {
            "$numberLong": "287"
          }
        },
        {
          "_id": "Hong Kong",
          "count": {
            "$numberLong": "1"
          }
        }
      ]
    },
    "details_level3": {
      "buckets": [
        {
          "_id": "United States/Oahu/Condominium/Entire home/apt",
          "count": {
            "$numberLong": "63"
          }
        },
        {
          "_id": "United States/Oahu/Apartment/Entire home/apt",
          "count": {
            "$numberLong": "54"
          }
        },
        {
          "_id": "United States/Oahu/House/Entire home/apt",
          "count": {
            "$numberLong": "52"
          }
        },
        {
          "_id": "United States/Oahu/House/Private room",
          "count": {
            "$numberLong": "20"
          }
        },
        {
          "_id": "United States/Oahu/Guest suite/Entire home/apt",
          "count": {
            "$numberLong": "13"
          }
        },
        {
          "_id": "United States/Oahu/Guesthouse/Entire home/apt",
          "count": {
            "$numberLong": "10"
          }
        },
        {
          "_id": "United States/Maui/Condominium/Entire home/apt",
          "count": {
            "$numberLong": "8"
          }
        },
        {
          "_id": "United States/Oahu/Apartment/Private room",
          "count": {
            "$numberLong": "6"
          }
        },
        {
          "_id": "United States/Oahu/Condominium/Private room",
          "count": {
            "$numberLong": "3"
          }
        },
        {
          "_id": "United States/Oahu/Cottage/Entire home/apt",
          "count": {
            "$numberLong": "3"
          }
        }
      ]
    },
    "details_level4": {
      "buckets": [
        {
          "_id": "United States/Oahu/Condominium/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "62"
          }
        },
        {
          "_id": "United States/Oahu/Apartment/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "54"
          }
        },
        {
          "_id": "United States/Oahu/House/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "52"
          }
        },
        {
          "_id": "United States/Oahu/House/Private room/Real Bed",
          "count": {
            "$numberLong": "20"
          }
        },
        {
          "_id": "United States/Oahu/Guest suite/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "13"
          }
        },
        {
          "_id": "United States/Oahu/Guesthouse/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "10"
          }
        },
        {
          "_id": "United States/Maui/Condominium/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "8"
          }
        },
        {
          "_id": "United States/Oahu/Apartment/Private room/Real Bed",
          "count": {
            "$numberLong": "5"
          }
        },
        {
          "_id": "United States/Oahu/Condominium/Private room/Real Bed",
          "count": {
            "$numberLong": "3"
          }
        },
        {
          "_id": "United States/Oahu/Cottage/Entire home/apt/Real Bed",
          "count": {
            "$numberLong": "3"
          }
        }
      ]
    }
  }
}
```

# Nested facet response
These need to be nested into each other to create a hierarchical structure. This is done use `$map` and other operators available in the MongoDB aggregation pipeline stages to finally get a nested output which preserves the counts at each level:

```
{
  "count": {
    "lowerBound": {
      "$numberLong": "288"
    }
  },
  "facet": {
    "details": {
      "buckets": [
        {
          "_id": "United States",
          "count": {
            "$numberLong": "287"
          },
          "path": [
            "United States"
          ],
          "buckets": [
            {
              "_id": "Oahu",
              "count": {
                "$numberLong": "253"
              },
              "path": [
                "United States",
                "Oahu"
              ],
              "buckets": [
                {
                  "_id": "House",
                  "count": {
                    "$numberLong": "74"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "House"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "52"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "House",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    },
                    {
                      "_id": "Private room",
                      "count": {
                        "$numberLong": "20"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "House",
                        "Private room"
                      ],
                      "buckets": [
                        {
                          "path": [
                            "United States",
                            "Oahu",
                            "House",
                            "Private room",
                            "Real Bed"
                          ],
                          "_id": "Real Bed",
                          "count": {
                            "$numberLong": "20"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "_id": "Condominium",
                  "count": {
                    "$numberLong": "67"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Condominium"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "63"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Condominium",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    },
                    {
                      "_id": "Private room",
                      "count": {
                        "$numberLong": "3"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Condominium",
                        "Private room"
                      ],
                      "buckets": [
                        {
                          "path": [
                            "United States",
                            "Oahu",
                            "Condominium",
                            "Private room",
                            "Real Bed"
                          ],
                          "_id": "Real Bed",
                          "count": {
                            "$numberLong": "3"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "_id": "Apartment",
                  "count": {
                    "$numberLong": "60"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Apartment"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "54"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Apartment",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    },
                    {
                      "_id": "Private room",
                      "count": {
                        "$numberLong": "6"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Apartment",
                        "Private room"
                      ],
                      "buckets": [
                        {
                          "path": [
                            "United States",
                            "Oahu",
                            "Apartment",
                            "Private room",
                            "Real Bed"
                          ],
                          "_id": "Real Bed",
                          "count": {
                            "$numberLong": "5"
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "_id": "Guest suite",
                  "count": {
                    "$numberLong": "13"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Guest suite"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "13"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Guest suite",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    }
                  ]
                },
                {
                  "_id": "Guesthouse",
                  "count": {
                    "$numberLong": "11"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Guesthouse"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "10"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Guesthouse",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    }
                  ]
                },
                {
                  "_id": "Villa",
                  "count": {
                    "$numberLong": "4"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Villa"
                  ],
                  "buckets": []
                },
                {
                  "_id": "Bungalow",
                  "count": {
                    "$numberLong": "3"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Bungalow"
                  ],
                  "buckets": []
                },
                {
                  "_id": "Cottage",
                  "count": {
                    "$numberLong": "3"
                  },
                  "path": [
                    "United States",
                    "Oahu",
                    "Cottage"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "3"
                      },
                      "path": [
                        "United States",
                        "Oahu",
                        "Cottage",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    }
                  ]
                }
              ]
            },
            {
              "_id": "The Big Island",
              "count": {
                "$numberLong": "17"
              },
              "path": [
                "United States",
                "The Big Island"
              ],
              "buckets": [
                {
                  "_id": "Condominium",
                  "count": {
                    "$numberLong": "3"
                  },
                  "path": [
                    "United States",
                    "The Big Island",
                    "Condominium"
                  ],
                  "buckets": []
                }
              ]
            },
            {
              "_id": "Maui",
              "count": {
                "$numberLong": "14"
              },
              "path": [
                "United States",
                "Maui"
              ],
              "buckets": [
                {
                  "_id": "Condominium",
                  "count": {
                    "$numberLong": "8"
                  },
                  "path": [
                    "United States",
                    "Maui",
                    "Condominium"
                  ],
                  "buckets": [
                    {
                      "_id": "apt",
                      "count": {
                        "$numberLong": "8"
                      },
                      "path": [
                        "United States",
                        "Maui",
                        "Condominium",
                        "Entire home",
                        "apt"
                      ],
                      "buckets": []
                    }
                  ]
                }
              ]
            },
            {
              "_id": "Kauai",
              "count": {
                "$numberLong": "2"
              },
              "path": [
                "United States",
                "Kauai"
              ],
              "buckets": []
            },
            {
              "_id": "",
              "count": {
                "$numberLong": "1"
              },
              "path": [
                "United States",
                ""
              ],
              "buckets": []
            }
          ]
        },
        {
          "_id": "Hong Kong",
          "count": {
            "$numberLong": "1"
          },
          "path": [
            "Hong Kong"
          ],
          "buckets": [
            {
              "_id": "Hong Kong",
              "count": {
                "$numberLong": "1"
              },
              "path": [
                "Hong Kong",
                "Hong Kong"
              ],
              "buckets": []
            }
          ]
        }
      ]
    }
  }
}
```

# Full aggregation pipeline
```
[
  {
    $searchMeta: {
      index: "nestedFacetsSearchIndex",
      facet: {
        operator: {
          compound: {
            must: [
              {
                text: {
                  query: "oahu",
                  path: {
                    wildcard: "*"
                  }
                }
              }
            ],
            filter: []
          }
        },
        facets: {
          room_type: {
            type: "string",
            path: "room_type"
          },
          details_level0: {
            type: "string",
            path: "details.level0"
          },
          details_level1: {
            type: "string",
            path: "details.level1"
          },
          details_level2: {
            type: "string",
            path: "details.level2"
          },
          details_level3: {
            type: "string",
            path: "details.level3"
          },
          details_level4: {
            type: "string",
            path: "details.level4"
          }
        }
      }
    }
  },
  {
    $addFields: {
      "facet.details_level0.buckets": {
        $map: {
          input: "$facet.details_level0.buckets",
          as: "bucket",
          in: {
            path: {
              $split: ["$$bucket._id", "/"]
            },
            _id: "$$bucket._id",
            count: "$$bucket.count"
          }
        }
      },
      "facet.details_level1.buckets": {
        $map: {
          input: "$facet.details_level1.buckets",
          as: "bucket",
          in: {
            path: {
              $split: ["$$bucket._id", "/"]
            },
            _id: "$$bucket._id",
            count: "$$bucket.count"
          }
        }
      },
      "facet.details_level2.buckets": {
        $map: {
          input: "$facet.details_level2.buckets",
          as: "bucket",
          in: {
            path: {
              $split: ["$$bucket._id", "/"]
            },
            _id: "$$bucket._id",
            count: "$$bucket.count"
          }
        }
      },
      "facet.details_level3.buckets": {
        $map: {
          input: "$facet.details_level3.buckets",
          as: "bucket",
          in: {
            path: {
              $split: ["$$bucket._id", "/"]
            },
            _id: "$$bucket._id",
            count: "$$bucket.count"
          }
        }
      },
      "facet.details_level4.buckets": {
        $map: {
          input: "$facet.details_level4.buckets",
          as: "bucket",
          in: {
            path: {
              $split: ["$$bucket._id", "/"]
            },
            _id: {
              $last: {
                $split: ["$$bucket._id", "/"]
              }
            },
            count: "$$bucket.count"
          }
        }
      }
    }
  },
  {
    $addFields: {
      "facet.details_level3.buckets": {
        $map: {
          input: "$facet.details_level3.buckets",
          as: "bucket",
          in: {
            _id: {
              $last: "$$bucket.path"
            },
            count: "$$bucket.count",
            path: "$$bucket.path",
            buckets: {
              $filter: {
                input:
                  "$facet.details_level4.buckets",
                as: "candidate",
                cond: {
                  $eq: [
                    {
                      $slice: [
                        "$$candidate.path",
                        4
                      ]
                    },
                    "$$bucket.path"
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  {
    $addFields: {
      "facet.details_level2.buckets": {
        $map: {
          input: "$facet.details_level2.buckets",
          as: "bucket",
          in: {
            _id: {
              $last: "$$bucket.path"
            },
            count: "$$bucket.count",
            path: "$$bucket.path",
            buckets: {
              $filter: {
                input:
                  "$facet.details_level3.buckets",
                as: "candidate",
                cond: {
                  $eq: [
                    {
                      $slice: [
                        "$$candidate.path",
                        3
                      ]
                    },
                    "$$bucket.path"
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  {
    $addFields: {
      "facet.details_level1.buckets": {
        $map: {
          input: "$facet.details_level1.buckets",
          as: "bucket",
          in: {
            _id: {
              $last: "$$bucket.path"
            },
            count: "$$bucket.count",
            path: "$$bucket.path",
            buckets: {
              $filter: {
                input:
                  "$facet.details_level2.buckets",
                as: "candidate",
                cond: {
                  $eq: [
                    {
                      $slice: [
                        "$$candidate.path",
                        2
                      ]
                    },
                    "$$bucket.path"
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  {
    $addFields: {
      "facet.details_level0.buckets": {
        $map: {
          input: "$facet.details_level0.buckets",
          as: "bucket",
          in: {
            _id: {
              $last: "$$bucket.path"
            },
            count: "$$bucket.count",
            path: "$$bucket.path",
            buckets: {
              $filter: {
                input:
                  "$facet.details_level1.buckets",
                as: "candidate",
                cond: {
                  $eq: [
                    {
                      $slice: [
                        "$$candidate.path",
                        1
                      ]
                    },
                    "$$bucket.path"
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  {
    $set: {
      "facet.details": "$facet.details_level0"
    }
  },
  {
    $unset: [
      "facet.details_level4",
      "facet.details_level3",
      "facet.details_level2",
      "facet.details_level1",
      "facet.details_level0"
    ]
  }
]
```