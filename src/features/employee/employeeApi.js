import { apiSlice } from '../api/apiSlice';


export const employeeApi = apiSlice.injectEndpoints({
 
  endpoints: (builder) => ({

    //Employee endpoints
    getEmployees: builder.query({
      query: () => '/employee/employee/',
      providesTags:["Employee"]
    }),
    getEmployee: builder.query({
      query: (id) => `/employee/employee/${id}/`,
    }),
    addEmployee:builder.mutation({
      query: (data) => ({
        url:`/employee/employee/`,
        method: "POST",
        body: data,
        invalidatesTags: ["Employee"]  
      }),
    }),
    updateEmployee:builder.mutation({
      query: ({id, data}) => ({
        url:`/employee/employee/${id}/`,
        method: "PATCH",
        body: data,
        invalidatesTags: ["Employee"]  
      }),
      }),
    deleteEmployee:builder.mutation({
      query: (id) => ({
        url:`/employee/employee/${id}/`,
        method: "DELETE",
        invalidatesTags: ["Employee"]  
      }),
    }),
      // designation endpoints

      getDesignations: builder.query({
        query: () => '/employee/designation/',
        providesTags:["Designation"]
      }),
      getDesignation: builder.query({
        query: (id) => `/employee/designation/${id}/`,
      }),
      addDesignation:builder.mutation({
        query: (data) => ({
          url:`/employee/designation/`,
          method: "POST",
          body: data,
          invalidatesTags: ["Designation"]  
        }),
      }),
      updateDesignation:builder.mutation({
        query: ({id, data}) => ({
          url:`/employee/designation/${id}/`,
          method: "PATCH",
          body: data,
          invalidatesTags: ["Designation"]  
        }),
        }),
      deleteDesignation:builder.mutation({
        query: (id) => ({
          url:`/employee/designation/${id}/`,
          method: "DELETE",
          invalidatesTags: ["Designation"]  
        }),
      }),

      // attendance endpoints
      getAttendances: builder.query({
        query: () => '/employee/attendance/',
        providesTags:["Attendance"]
      }),
      getAttendance: builder.query({
        query: (id) => `/employee/attendance/${id}/`,
      }),
      addAttendance:builder.mutation({
        query: (data) => ({
          url:`/employee/attendance/`,
          method: "POST",
          body: data,
          invalidatesTags: ["Attendance"]  
        }),
      }),
      updateAttendance:builder.mutation({
        query: ({id, data}) => ({
          url:`/employee/attendance/${id}`,
          method: "PATCH",
          body: data,
          invalidatesTags: ["Attendance"]  
        }),
      }),
      deleteAttendance:builder.mutation({
        query: (id) => ({
          url:`/employee/attendance/${id}`,
          method: "DELETE",
          invalidatesTags: ["Attendance"]  
        }),
      }),

      // Leave Endpoints
      getLeave: builder.query({
        query: () => `/employee/leave/`,
        providesTags:["Leave"]

      }),
      addLeave:builder.mutation({
        query: (data) => ({
          url:`/employee/leave/`,
          method: "POST",
          body: data,
          invalidatesTags: ["Leave"]  
        }),
      }),

      // Occasion

      getOccasion: builder.query({
        query: () => `/employee/occasion/`,
        providesTags:["Occasion"]

      }),
      addOccasion:builder.mutation({
        query: (data) => ({
          url:`/employee/occasion/`,
          method: "POST",
          body: data,
          invalidatesTags: ["Occasion"]  
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
  useUpdateAttendanceMutation,
  useDeleteAttendanceMutation,

  //leave
  useGetLeaveQuery,
  useAddLeaveMutation,

  // occasion

  useGetOccasionQuery,
  useAddOccasionMutation,
  
} = employeeApi;