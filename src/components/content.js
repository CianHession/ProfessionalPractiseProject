import React, {useState} from 'react';
import axios from 'axios';
import {LOGIN_TOKEN_NAME, API_ROOT, LOGIN_TOKEN_ID} from "../constants";

const user = localStorage.getItem(LOGIN_TOKEN_NAME);
const userId = localStorage.getItem(LOGIN_TOKEN_ID);