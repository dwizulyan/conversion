import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'
import { zValidator } from '@hono/zod-validator';
import { z } from "zod";

import tempConversion from './utils/functions/celsToFahren'

const app = new Hono()

// create a schema to validate
const tempSchema = z.object({
  temp: z.string(),
  from: z.enum(["celcius", "fahrenheit", "kelvin"]),
  to: z.enum(["celcius", "fahrenheit", "kelvin"])

})

// valdate middleware
// using hono zValidator + zod
const validateTemp = zValidator("query", tempSchema, (result, c: Context) => {
  if (!result.success) {
    return c.json({
      success: false,
      message: result.error.message,
      data: {}
    })
  }
})

// declare the type too
type TempConvert = z.infer<typeof tempSchema>

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// convert celcius to fahrenheit
// expected number as input from user 
// return number
app.get("/api/convert/cels-to-fahren", validateTemp, (c: Context) => {
  const data = c.req.query() as TempConvert;
  try {
    const conversion = tempConversion(Number(data.temp), data.from, data.to) as { status: boolean, message: string, conversion: any }
    // check if the conversion is not in false status
    // if status = false return this
    if (!conversion.status) {
      return c.json({
        status: conversion.status,
        message: conversion.message,
        data: conversion.conversion
      }, 400)
    }
    return c.json({
      status: conversion.status,
      message: conversion.message,
      data: conversion.conversion
    }, 200)

  } catch (err) {
    return c.json({
      status: false,
      message: err,
      data: {}
    }, 400)
  }
})


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
