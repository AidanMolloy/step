// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.data;

import java.util.Date;

/** Creates comments from from received data. */
public final class Comments {

  private final long id;
  private final String username;
  private final String comment;
  private final Date currentDate;

  public Comments(long id, String username, String comment, Date currentDate) {
    this.id = id;
    this.username = username;
    this.comment = comment;
    this.currentDate = currentDate;
  }

  public long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getComment() {
    return comment;
  }

  public Date getCurrentDate() {
    return currentDate;
  }
}
