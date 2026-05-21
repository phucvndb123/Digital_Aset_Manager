package com.inswave.training.health.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.sql.DataSource;
import java.sql.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class DbHealthControllerTest {

    @Mock
    private DataSource dataSource;

    @Mock
    private Connection connection;

    @Mock
    private PreparedStatement preparedStatement;

    @Mock
    private ResultSet resultSet;

    @Mock
    private DatabaseMetaData databaseMetaData;

    @InjectMocks
    private DbHealthController dbHealthController;

    private MockMvc mockMvc;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(dbHealthController).build();
    }

    private void setUpHappyPath() throws SQLException {
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.prepareStatement("SELECT 1")).thenReturn(preparedStatement);
        when(preparedStatement.executeQuery()).thenReturn(resultSet);
        when(resultSet.next()).thenReturn(true);
        when(resultSet.getInt(1)).thenReturn(1);
        when(connection.getMetaData()).thenReturn(databaseMetaData);
        when(databaseMetaData.getDatabaseProductName()).thenReturn("MariaDB");
        when(databaseMetaData.getDatabaseProductVersion()).thenReturn("10.5.12");
    }

    // --- Happy path ---

    @Test
    public void dbHealth_whenConnectionSucceeds_returnsStatusUp() throws Exception {
        setUpHappyPath();

        mockMvc.perform(get("/health/db"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.result").value(1));
    }

    @Test
    public void dbHealth_whenConnectionSucceeds_returnsDatabaseMetadata() throws Exception {
        setUpHappyPath();

        mockMvc.perform(get("/health/db"))
                .andExpect(jsonPath("$.databaseProduct").value("MariaDB"))
                .andExpect(jsonPath("$.databaseVersion").value("10.5.12"));
    }

    @Test
    public void dbHealth_responseAlwaysHasEndpointField() throws Exception {
        setUpHappyPath();

        mockMvc.perform(get("/health/db"))
                .andExpect(jsonPath("$.endpoint").value("/health/db"));
    }

    @Test
    public void dbHealth_includesQueryField() throws Exception {
        setUpHappyPath();

        mockMvc.perform(get("/health/db"))
                .andExpect(jsonPath("$.query").value("SELECT 1"));
    }

    // --- Error path ---

    @Test
    public void dbHealth_whenConnectionFails_returnsServiceUnavailable() throws Exception {
        when(dataSource.getConnection()).thenThrow(new SQLException("Connection refused"));

        mockMvc.perform(get("/health/db"))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.status").value("DOWN"))
                .andExpect(jsonPath("$.error").value("Connection refused"));
    }

    @Test
    public void dbHealth_whenConnectionFails_endpointFieldStillPresent() throws Exception {
        when(dataSource.getConnection()).thenThrow(new SQLException("Timeout"));

        mockMvc.perform(get("/health/db"))
                .andExpect(jsonPath("$.endpoint").value("/health/db"));
    }

    @Test
    public void dbHealth_whenQueryFails_returnsServiceUnavailable() throws Exception {
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.prepareStatement("SELECT 1")).thenReturn(preparedStatement);
        when(preparedStatement.executeQuery()).thenThrow(new SQLException("Query error"));

        mockMvc.perform(get("/health/db"))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.status").value("DOWN"));
    }
}
