import { apiSlice } from '../api/apiSlice';


export const employeeApi = apiSlice.injectEndpoints({
  tagTypes:['employee', 'designation', 'attendance'],
  endpoints: (builder) => ({

    //Employee endpoints
    getEmployees: builder.query({
      query: () => '/employee/employee/',
      provideTags:["employee"]
    }),
    getEmployee: builder.query({
      query: (id) => `/employee/employee/${id}/`,
    }),
    addEmployee:builder.mutation({
      query: (data) => ({
        url:`employee/employee/`,
        method: "POST",
        body: data,
        invalidatesTags: ["employee"]  
      }),
    }),
    updateEmployee:builder.mutation({
      query: ({id, data}) => ({
        url:`employee/employee/${id}/`,
        method: "PATCH",
        body: data,
        invalidatesTags: ["employee"]  
      }),
      }),
    deleteEmployee:builder.mutation({
      query: (id) => ({
        url:`employee/employee/${id}/`,
        method: "DELETE",
        invalidatesTags: ["employee"]  
      }),
    }),
      // designation endpoints

      getDesignations: builder.query({
        query: () => '/employee/designation/',
        provideTags:["designation"]
      }),
      getDesignation: builder.query({
        query: (id) => `/employee/designation/${id}/`,
      }),
      addDesignation:builder.mutation({
        query: (data) => ({
          url:`employee/designation/`,
          method: "POST",
          body: data,
          invalidatesTags: ["designation"]  
        }),
      }),
      updateDesignation:builder.mutation({
        query: ({id, data}) => ({
          url:`employee/designation/${id}/`,
          method: "PATCH",
          body: data,
          invalidatesTags: ["designation"]  
        }),
        }),
      deleteDesignation:builder.mutation({
        query: (id) => ({
          url:`employee/designation/${id}/`,
          method: "DELETE",
          invalidatesTags: ["designation"]  
        }),
      }),

      // attendance endpoints
      getAttendances: builder.query({
        query: () => '/employee/attendance/',
        provideTags:["attendance"]
      }),
      getAttendance: builder.query({
        query: (id) => `/employee/attendance/${id}/`,
      }),
      addAttendance:builder.mutation({
        query: (data) => ({
          url:`employee/attendance/`,
          method: "POST",
          body: data,
          invalidatesTags: ["attendance"]  
        }),
      }),

      // Leave Endpoints
      getLeave: builder.query({
        query: () => `/employee/leave/`,
        provideTags:["leave"]

      }),
      addLeave:builder.mutation({
        query: (data) => ({
          url:`employee/leave/`,
          method: "POST",
          body: data,
          invalidatesTags: ["leave"]  
        }),
      }),

      // Occasion

      getOccasion: builder.query({
        query: () => `/employee/occasion/`,
        provideTags:["leave"]

      }),
      addOccasion:builder.mutation({
        query: (data) => ({
          url:`employee/occasion/`,
          method: "POST",
          body: data,
          invalidatesTags: ["leave"]  
        }),
      }),

  }),
});

export const { 
  useGetEmployeesQuery, 
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,

  // designation
  useGetDesignationQuery,
  useGetDesignationsQuery,
  useAddDesignationMutation,
  useUpdateDesignationMutation,
  useDeleteDesignationMutation,
  
  //attendance 
  useGetAttendanceQuery,
  useGetAttendancesQuery,
  useAddAttendanceMutation,
  // useUpdateAttendanceMutation,
  // useDeleteAttendanceMutation,

  //leave
  useGetLeaveQuery,
  useAddLeaveMutation,

  // occasion

  useGetOccasionQuery,
  useAddOccasionMutation,
  
} = employeeApi;